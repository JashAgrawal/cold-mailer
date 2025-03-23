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


const NewReciverForm = ({templateId}: {templateId: string}) => {
  const [email, setEmail] = React.useState("");
  const {selectedTemplate} = useEmailTemplateStore();
  const [variables, setVariables] = React.useState<Record<string, string>>({});
  const queryClient = useQueryClient();
  useEffect(() => {
    if (selectedTemplate) {
      setVariables(selectedTemplate.variable.reduce((acc, variable) => {
        acc[variable] = "";
        return acc;
      }, {} as Record<string, string>));
    }
  }, [selectedTemplate]);

  const handleAddReciverMutations = useMutation({
    mutationFn: async ({email, templateId, variables}: {email: string, templateId: string, variables: Record<string, string>}) => {
      const variablesJson = JSON.stringify(variables);
      await createReceiver({email, templateId, variables: variablesJson,status:"pending", openedAt: null, openedCount: 0});
      await updateTemplate(templateId, {membersCount: (selectedTemplate?.membersCount || 0) + 1});
    },
    onMutate: async ({email, variables,templateId}) => {
      await queryClient.cancelQueries({
        queryKey: ["receivers", templateId],
      });
      queryClient.setQueryData(["receivers", templateId], (oldRecivers: any) => {
        if (oldRecivers) {
          const updatedRecivers = [...oldRecivers, {
            id: ""+Math.floor(10000 + Math.random() * 90000),
            email,
            templateId,
            variables: JSON.stringify(variables),
            status: "pending",
          }];
          return updatedRecivers;
        }
        return oldRecivers
      });
    },
    onSuccess: () => {
      toast.success("Reciver added successfully");
    },
    onError: () => {
      toast.error("Failed to add reciver");
      queryClient.invalidateQueries({
        queryKey: ["receivers", templateId],
      });
    },
  });
  return (
    <form className="flex items-center gap-4 bg-gray-100 p-4 rounded-md fixed bottom-24 left-10 right-10">
      {selectedTemplate && selectedTemplate.variable.map(
        (variable) => (
          <Input
            key={variable}
            className="w-full bg-white"
            placeholder={variable}
            type="text"
            required
            value={variables[variable]}
            onChange={(e) => setVariables({ ...variables, [variable]: e.target.value })}
          />
        )
      )}

      <Input
        className="w-full bg-white"
        placeholder="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button type="submit" onClick={() => handleAddReciverMutations.mutate({email, templateId, variables})}>
        Add Reciver
      </Button>
    </form>
  );
};

export default NewReciverForm;
