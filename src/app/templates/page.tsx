"use client";

import type { Metadata } from "next";
import CreateEmailTemplateDialog from "@/components/email/createDialog";
import TemplateCard from "@/components/email/templateCard";
import TemplateCardSkeleton from "@/components/email/templateCardSkeleton";
import { getTemplatesByUser } from "@/db/templates";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TemplatesStructuredData from "./templates-structured-data";

export const metadata: Metadata = {
  title: "Email Templates - MailMaster",
  description:
    "Create and manage your email templates with dynamic variables for personalized outreach campaigns.",
  alternates: {
    canonical: "https://mailer.jashagrawal.in/templates",
  },
};

const Templates = () => {
  const { user } = useUser();

  const {
    data: templates,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["templates", user?.id],
    queryFn: () => getTemplatesByUser(user?.id || ""),
    enabled: !!user?.id,
  });

  return (
    <>
      <TemplatesStructuredData />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">
              Email Templates
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your email templates
            </p>
          </div>
          <CreateEmailTemplateDialog refetch={refetch} />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <TemplateCardSkeleton key={index} />
            ))}
          </div>
        ) : templates?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted/30 p-4 rounded-full mb-4">
              <Mail className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No templates yet</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Create your first email template to get started with sending
              personalized emails.
            </p>
            <CreateEmailTemplateDialog refetch={refetch}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </CreateEmailTemplateDialog>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates?.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Templates;
