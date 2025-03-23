import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IEmailTemplate } from "./type";
import Link from "next/link";
import { Badge } from "../ui/badge";
import moment from "moment";

const TemplateCard = ({ template }: { template: IEmailTemplate }) => {
  return (
    <Link href={`/templates/${template.id}`}>
      <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <p className="text-sm text-gray-500">{template.subject}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          <p className="text-sm text-gray-500">Variables :- </p>
          {template.variable.map((variable, index) => (
            <Badge key={index}>{variable}</Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><span className="font-semibold">Members:</span> {template.membersCount}</p>
          <p><span className="font-semibold">Mails Sent:</span> {template.mailsSent}</p>
          <p><span className="font-semibold">Opened:</span> {template.openedCount}</p>
          <p><span className="font-semibold">Created At:</span> {moment(template.createdAt).format('LL')}</p>
          <p><span className="font-semibold">Updated At:</span> {moment(template.updatedAt).format('LL')}</p>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default TemplateCard;
