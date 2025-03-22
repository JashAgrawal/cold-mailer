import { IReciver } from "@/components/mailer/type";

export interface IEmailTemplate {
  id?: string;
  userId: string;
  name: string;
  subject: string;
  content: string;
  variable: string[];
  membersCount: number;
  mailsSent: number;
  createdAt: Date;
  updatedAt: Date;
  members?: IReciver[];
}

export interface EmailTemplateInput {
  userId: string;
  name: string;
  subject: string;
  content: string;
  variable: string[];
}
