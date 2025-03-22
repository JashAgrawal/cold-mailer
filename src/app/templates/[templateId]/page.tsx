
"use client";
import Mailer from '@/components/mailer'
import { getReceiversByTemplate } from '@/db/recivers';
import { getTemplate } from '@/db/templates';
import { useEmailTemplateStore } from '@/store/template';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'

const Page = ({params}: {params: Promise<{templateId: string}>}) => {
  const [tId,setTId] = React.useState('');
  const {selectedTemplate} = useEmailTemplateStore();

  const {data:receivers} = useQuery({
    queryKey: ["receivers", tId],
    queryFn: async () => getReceiversByTemplate(tId),
    enabled: !!tId
  });

  useEffect(() => {
    const fetchTemplateId = async () => {
      const {templateId} = await params;
      const template = await getTemplate(templateId);
      if (template) {
        setTId(templateId);
        useEmailTemplateStore.setState({selectedTemplate: template});
      }
    };
    fetchTemplateId();
  }, [params]);

  
  return (
    <Mailer templateId={tId} receivers={receivers || []} />
  )
}

export default Page
