"use client"
import CreateEmailTemplateDialog from "@/components/email/createDialog";
import TemplateCard from "@/components/email/templateCard";
import TemplateCardSkeleton from "@/components/email/templateCardSkeleton";
import { getTemplatesByUser } from "@/db/templates";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Templates = () => {
  const {user} = useUser();
  
  const {data: templates,isLoading,refetch} = useQuery({
    queryKey: ["templates", user?.id],
    queryFn: () => getTemplatesByUser(user?.id || ""),
  })

  return (
    <div className="container flex flex-col gap-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-3xl xl:text-3xl">Email Templates</h1>
        <CreateEmailTemplateDialog  refetch={refetch}/>
      </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates?.length === 0 && (
            <div className="flex items-center justify-center col-span-3">
              No templates found
            </div>
          )}
          {isLoading && Array.from({ length: 3 }).map((_, index) => (
            <TemplateCardSkeleton key={index} />
          ))}
          {templates?.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      
    </div>
  );
};

export default Templates;
