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

const TemplateCard = ({ template }: { template: IEmailTemplate }) => {
  return (
    <Link href={`/templates/${template.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{template.name}</CardTitle>
          <CardDescription>{template.subject}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p>Members</p>
              <p>{template.membersCount}</p>
            </div>
            <div>
              <p>Mails Sent</p>
              <p>{template.mailsSent}</p>
            </div>
            <div>variables :- {template.variable.join(", ")}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TemplateCard;
