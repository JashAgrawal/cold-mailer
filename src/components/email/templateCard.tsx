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
    <Link
      href={`/templates/${template.id}`}
      className="block h-full transition-transform hover:scale-[1.01]"
    >
      <Card className="w-full h-full overflow-hidden border-2 hover:border-primary/50">
        <CardHeader>
          <CardTitle className="line-clamp-1">{template.name}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {template.subject}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <p className="text-sm text-muted-foreground">Variables:</p>
            <div className="flex flex-wrap gap-1">
              {template.variable.slice(0, 3).map((variable, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {variable}
                </Badge>
              ))}
              {template.variable.length > 3 && (
                <Badge key="..." variant="outline" className="text-xs">
                  +{template.variable.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Members:</span>
              <span className="text-muted-foreground">
                {template.membersCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Emails Sent:</span>
              <span className="text-muted-foreground">
                {template.mailsSent}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Opened:</span>
              <span className="text-muted-foreground">
                {template.openedCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Created:</span>
              <span className="text-muted-foreground">
                {moment(template.createdAt).format("ll")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TemplateCard;
