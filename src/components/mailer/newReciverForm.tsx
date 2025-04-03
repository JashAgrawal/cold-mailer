"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getDefaultReciver, IReciver } from "@/components/mailer/type";
import { useEmailTemplateStore } from "@/store/template";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReceiver } from "@/db/recivers";
import { toast } from "sonner";
import { updateTemplate } from "@/db/templates";
import { Card, CardContent } from "../ui/card";

const NewReceiverForm = ({ templateId }: { templateId: string }) => {
  const [email, setEmail] = React.useState("");
  const { selectedTemplate } = useEmailTemplateStore();
  const [variables, setVariables] = React.useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedTemplate) {
      setVariables(
        selectedTemplate.variable.reduce((acc, variable) => {
          acc[variable] = "";
          return acc;
        }, {} as Record<string, string>)
      );
    }
  }, [selectedTemplate]);

  const handleAddReceiverMutation = useMutation({
    mutationFn: async ({
      email,
      templateId,
      variables,
    }: {
      email: string;
      templateId: string;
      variables: Record<string, string>;
    }) => {
      const variablesJson = JSON.stringify(variables);
      await createReceiver({
        email,
        templateId,
        variables: variablesJson,
        status: "pending",
        openedAt: null,
        openedCount: 0,
      });
      await updateTemplate(templateId, {
        membersCount: (selectedTemplate?.membersCount || 0) + 1,
      });
    },
    onSuccess: () => {
      toast.success("Receiver added successfully");
      // Clear form after successful submission
      setEmail("");
      if (selectedTemplate) {
        setVariables(
          selectedTemplate.variable.reduce((acc, variable) => {
            acc[variable] = "";
            return acc;
          }, {} as Record<string, string>)
        );
      }
    },
    onError: () => {
      toast.error("Failed to add receiver");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["receivers", templateId],
      });
    },
  });

  if (!selectedTemplate || !selectedTemplate.variable) return null;

  return (
    <Card className="w-full mt-8 mb-8">
      <CardContent className="pt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddReceiverMutation.mutate({ email, templateId, variables });
          }}
          className="flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {selectedTemplate.variable.map((variable) => (
              <Input
                key={variable}
                className="w-full"
                placeholder={variable}
                type="text"
                required
                value={variables[variable]}
                onChange={(e) =>
                  setVariables({ ...variables, [variable]: e.target.value })
                }
              />
            ))}

            <Input
              className="w-full"
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="whitespace-nowrap"
            disabled={handleAddReceiverMutation.isPending}
          >
            {handleAddReceiverMutation.isPending ? "Adding..." : "Add Receiver"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewReceiverForm;
