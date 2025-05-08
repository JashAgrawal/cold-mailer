import { sanitizeEmailContent, checkSpamTriggerWords } from "./emailUtils";

export function extractVariables(str: string) {
  // Extract variables from text, even if they're inside HTML tags
  const regex = /\[([^\]]+)\]/g;
  const matches = [];
  let match;

  while ((match = regex.exec(str)) !== null) {
    matches.push(match[1]);
  }

  return matches;
}

export const getEmailContent = (content: string, variables: string) => {
  let emailContent = content;
  if (variables === "") {
    return sanitizeEmailContent(emailContent);
  }

  try {
    const variablesObj: Record<string, string> = JSON.parse(variables);

    Object.entries(variablesObj).forEach(([key, value]) => {
      // Safely replace variables with proper escaping to prevent HTML injection
      const safeValue = value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

      emailContent = emailContent.replaceAll(`[${key}]`, safeValue);
    });

    // Apply spam prevention measures to the content
    return sanitizeEmailContent(emailContent);
  } catch (error) {
    console.error("Error processing email variables:", error);
    // Return the original content if there's an error
    return sanitizeEmailContent(content);
  }
};

export const getSubjectContent = (subject: string, variables: string) => {
  let subjectContent = subject;
  if (variables === "") {
    // Check for spam trigger words in the subject
    const spamCheck = checkSpamTriggerWords(subjectContent);
    if (spamCheck.hasSpamWords) {
      console.warn(`Subject contains potential spam trigger words: ${spamCheck.words.join(', ')}`);
    }
    return subjectContent;
  }

  try {
    const variablesObj: Record<string, string> = JSON.parse(variables);

    Object.entries(variablesObj).forEach(([key, value]) => {
      // Use a safe replacement method
      subjectContent = subjectContent.replace(`[${key}]`, value);
    });

    // Check for spam trigger words in the personalized subject
    const spamCheck = checkSpamTriggerWords(subjectContent);
    if (spamCheck.hasSpamWords) {
      console.warn(`Personalized subject contains potential spam trigger words: ${spamCheck.words.join(', ')}`);
    }

    return subjectContent;
  } catch (error) {
    console.error("Error processing subject variables:", error);
    return subject;
  }
};
