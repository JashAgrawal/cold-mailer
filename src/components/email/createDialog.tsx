"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TiptapEditor } from "../ui/tiptap-editor";
import { EmailTemplateInput } from "./type";
import { extractVariables } from "@/utils/data";
import { createTemplate } from "@/db/templates";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const CreateEmailTemplateDialog = ({
  refetch,
  children,
}: {
  refetch: () => void;
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { user } = useUser();
  const [emailTemplate, setEmailTemplate] = React.useState<EmailTemplateInput>({
    name: "",
    userId: user?.id || "",
    subject: "",
    content: "",
    variable: [],
  });

  // Update userId when user changes
  React.useEffect(() => {
    if (user?.id) {
      setEmailTemplate((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("You must be logged in to create a template");
      return;
    }

    setIsSubmitting(true);
    const variables = [
      ...new Set([
        ...extractVariables(emailTemplate.content),
        ...extractVariables(emailTemplate.subject),
      ]),
    ];

    try {
      await createTemplate({
        name: emailTemplate.name,
        userId: user.id,
        subject: emailTemplate.subject,
        content: emailTemplate.content,
        variable: variables,
        membersCount: 0,
        mailsSent: 0,
        openedCount: 0,
      });

      setEmailTemplate({
        name: "",
        userId: user.id,
        subject: "",
        content: "",
        variable: [],
      });

      refetch();
      setOpen(false);
      toast.success("Template created successfully");
    } catch (error) {
      console.error("Error creating template:", error);
      toast.error("Failed to create template");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {children || <Button variant="outline">Create Template</Button>}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Email Template</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                type="text"
                required
                placeholder="Enter a name for your template"
                value={emailTemplate.name}
                onChange={(e) =>
                  setEmailTemplate({ ...emailTemplate, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-subject">Email Subject</Label>
              <Input
                id="template-subject"
                type="text"
                required
                placeholder="Enter the email subject line"
                value={emailTemplate.subject}
                onChange={(e) =>
                  setEmailTemplate({
                    ...emailTemplate,
                    subject: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-content">Email Content</Label>
              <div className="min-h-[300px]">
                <TiptapEditor
                  value={emailTemplate.content}
                  onChange={(value) =>
                    setEmailTemplate({ ...emailTemplate, content: value })
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Use [variable_name] syntax to create personalized variables that
                can be replaced for each recipient.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                isSubmitting || !emailTemplate.name || !emailTemplate.subject
              }
            >
              {isSubmitting ? "Creating..." : "Create Template"}
            </Button>
          </form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmailTemplateDialog;
