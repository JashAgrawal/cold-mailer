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
import { Textarea } from "../ui/textarea";
import { EmailTemplateInput } from "./type";
import { extractVariables } from "@/utils/data";
import { createTemplate } from "@/db/templates";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const CreateEmailTemplateDialog = ({
  refetch,
}: {
  refetch: any;
}) => {
  const [open, setOpen] = React.useState(false);
  const {user} = useUser();
  const [emailTemplate, setEmailTemplate] = React.useState<EmailTemplateInput>({
    name: "",
    userId: user?.id!,
    subject: "",
    content: "",
    variable: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const variables = [...new Set([...extractVariables(emailTemplate.content), ...extractVariables(emailTemplate.subject)])];
    try {
      await createTemplate({
        name: emailTemplate.name,
        userId: user?.id!,
        subject: emailTemplate.subject,
        content: emailTemplate.content,
        variable: variables,
        membersCount: 0,
        mailsSent: 0,
        openedCount: 0,
      });
      setEmailTemplate({
        name: "",
        userId: user?.id!,
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline">Create Template</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[60vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Email Template</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Label>Name</Label>
            <Input
              type="text"
              required
              value={emailTemplate.name}
              onChange={(e) =>
                setEmailTemplate({ ...emailTemplate, name: e.target.value })
              }
            />
            <Label>Subject</Label>
            <Input
              type="text"
              required
              value={emailTemplate.subject}
              onChange={(e) =>
                setEmailTemplate({ ...emailTemplate, subject: e.target.value })
              }
            />
            <Label>Content</Label>
            <Textarea
              rows={20}
              required
              value={emailTemplate.content}
              onChange={(e) =>
                setEmailTemplate({ ...emailTemplate, content: e.target.value })
              }
            />
            <Button type="submit">Create</Button>
          </form>
        </div>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmailTemplateDialog;
