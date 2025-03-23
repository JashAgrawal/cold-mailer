"use server";
import { getReceiversByTemplate, updateReceiverStatus } from "@/db/server-env/recivers";
import { getEmailContent, getSubjectContent } from "./data";
import { getTransporter } from "./realMailer";
import { IReciver } from "@/components/mailer/type";
import { updateTemplate } from "@/db/server-env/templates";

export const sendMails = async (recivers: IReciver[],content: string,subject: string,templateId: string) => {
  console.log(templateId);
  try {
    await Promise.all(
      recivers.map((reciver) => {
        sendSingleMail(reciver,content,reciver.variables,subject);
      })
    );
    const newRecivers = await getReceiversByTemplate(templateId);
    await updateTemplate(templateId, {mailsSent: newRecivers.filter((r) => r.status === "sent").length});
    return true;
  } catch (error) {
    console.error("Error sending emails:", error);
    return false;
  }
};

export const sendSingleMail = async (reciver: IReciver,content: string,variables:string,subject: string) => {
    const transporter = await getTransporter();
    try {
      const trackingUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/track-email?reciverId=${reciver.id}`;
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: reciver.email,
        subject: getSubjectContent(subject,variables),
        html: getEmailContent(content,variables)+`<img src="${trackingUrl}" alt=" " width="1" height="1" style="display:none;" />`,
      };
      await transporter.sendMail(mailOptions);
      await updateReceiverStatus(reciver.id, "sent");
      return true;
    } catch (error) {
      console.error("Error sending emails single:", error);
      await updateReceiverStatus(reciver.id, "failed");
      return false;
    }
  };
