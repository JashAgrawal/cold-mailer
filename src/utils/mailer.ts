"use server";
import { updateReceiverStatus } from "@/db/recivers";
import { getEmailContent } from "./data";
import { getTransporter } from "./realMailer";
import { IReciver } from "@/components/mailer/type";

export const sendMails = async (recivers: IReciver[],content: string,subject: string) => {
  try {
    await Promise.all(
      recivers.map((reciver) => {
        sendSingleMail(reciver,content,reciver.variables,subject);
      })
    );
    return true;
  } catch (error) {
    console.error("Error sending emails:", error);
    return false;
  }
};

export const sendSingleMail = async (reciver: IReciver,content: string,variables:string,subject: string) => {
    const transporter = await getTransporter();
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: reciver.email,
        subject: subject,
        text: getEmailContent(content,variables),
      };
      await transporter.sendMail(mailOptions);
      updateReceiverStatus(reciver.id, "sent");
      return true;
    } catch (error) {
      console.error("Error sending emails:", error);
      updateReceiverStatus(reciver.id, "failed");
      return false;
    }
  };
