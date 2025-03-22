"use client"
import CreateEmailTemplateDialog from "@/components/email/createDialog";
import TemplateCard from "@/components/email/templateCard";
import React from "react";
import { getTemplatesByUser } from "@/db/templates";
import { auth } from "@/config/firebase";
import { useQuery } from "@tanstack/react-query";

const Templates = () => {

  const {data:templates, isLoading,refetch} = useQuery({
    queryKey: ["templates", auth.currentUser!.uid],
    queryFn: async () => getTemplatesByUser(auth.currentUser!.uid),
    enabled: !!auth.currentUser
  });

  return (
    <div className="container flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1>Email Templates</h1>
        <CreateEmailTemplateDialog refetch={refetch}/>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates?.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Templates;
