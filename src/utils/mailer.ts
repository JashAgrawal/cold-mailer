"use server";
import { getReceiversByTemplate, updateReceiverStatus } from "@/db/server-env/recivers";
import { getEmailContent, getSubjectContent } from "./data";
import { getTransporter } from "./realMailer";
import { IReciver } from "@/components/mailer/type";
import { updateTemplate } from "@/db/server-env/templates";
import { ISender } from "@/components/sender/type";
import { generateMessageId } from "./emailUtils";

/**
 * Generates a random delay between min and max seconds
 * This helps make the sending pattern less predictable to avoid spam filters
 *
 * @param min Minimum delay in seconds
 * @param max Maximum delay in seconds
 * @returns Delay in milliseconds
 */
const getRandomDelay = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
};

export const sendMails = async (recivers: IReciver[], content: string, subject: string, templateId: string, sender: ISender) => {
  try {
    // Use a randomized delay between emails to avoid sending too many at once (helps with deliverability)
    for (const reciver of recivers) {
      await sendSingleMail(reciver, content, reciver.variables, subject, sender);
      // Add a randomized delay between 1-3 seconds between emails to avoid triggering spam filters
      const randomDelay = getRandomDelay(1, 3);
      console.log(`Waiting ${randomDelay/1000} seconds before sending next email...`);
      await new Promise(resolve => setTimeout(resolve, randomDelay));
    }

    const newRecivers = await getReceiversByTemplate(templateId);
    await updateTemplate(templateId, {mailsSent: newRecivers.filter((r) => r.status === "sent").length});
    return true;
  } catch (error) {
    console.error("Error sending emails:", error);
    return false;
  }
};

export const sendSingleMail = async (reciver: IReciver, content: string, variables: string, subject: string, sender: ISender) => {
    const transporter = await getTransporter(sender.email, sender.password);
    try {
      // Extract domain from sender email for Message-ID
      const domain = sender.email.split('@')[1];
      const messageId = generateMessageId(domain);

      // Create a tracking URL with a more generic parameter name
      const trackingUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/track-email?reciverId=${reciver.id}`;

      // Get personalized content
      const personalizedSubject = getSubjectContent(subject, variables);
      const personalizedContent = getEmailContent(content, variables);

      // Get sender name from email or use a default
      const senderName = sender.email.split('@')[0].replace(/[.]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      // Create mail options with anti-spam headers
      const mailOptions = {
        from: `"${senderName}" <${sender.email}>`,
        to: reciver.email,
        subject: personalizedSubject,
        messageId: messageId,
        // Important headers for deliverability
        headers: {
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          'Importance': 'Normal',
          'X-Mailer': 'MailMaster',
          'List-Unsubscribe': `<mailto:unsubscribe@${domain}?subject=Unsubscribe>`,
          'Precedence': 'bulk'
        },
        // Text version is important for deliverability
        text: personalizedContent.replace(/<[^>]*>/g, ''),
        // HTML version with proper structure
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalizedSubject}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
  ${personalizedContent}
  <div style="margin-top: 20px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
    <p>If you no longer wish to receive these emails, you can <a href="mailto:unsubscribe@${domain}?subject=Unsubscribe">unsubscribe here</a>.</p>
  </div>
  <img src="${trackingUrl}" alt="" width="1" height="1" style="display:none;" />
</body>
</html>`,
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
