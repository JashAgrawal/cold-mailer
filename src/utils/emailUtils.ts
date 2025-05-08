"use server";

/**
 * Generates a unique Message-ID for email headers
 * This helps with email threading and deliverability
 * 
 * @param domain The domain to use in the Message-ID
 * @returns A properly formatted Message-ID string
 */
export const generateMessageId = (domain: string): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return `<${timestamp}.${random}@${domain}>`;
};

/**
 * Checks if an email subject contains common spam trigger words
 * 
 * @param subject The email subject to check
 * @returns An object with a boolean indicating if spam words were found and a list of the words
 */
export const checkSpamTriggerWords = (subject: string): { hasSpamWords: boolean; words: string[] } => {
  // Common spam trigger words that can affect deliverability
  const spamTriggerWords = [
    'free', 'guarantee', 'no obligation', 'winner', 'won', 'congratulations',
    'urgent', 'act now', 'limited time', 'offer', 'cash', 'credit', 'incredible',
    'million', 'billion', 'discount', 'save', 'money', 'price', 'no cost',
    'risk free', 'no risk', '100%', 'affordable', 'bargain', 'best price',
    'bonus', 'cash bonus', 'casino', 'cheap', 'claims', 'click', 'click here',
    'deal', 'direct email', 'direct marketing', 'double your', 'earn',
    'earn extra cash', 'earn money', 'eliminate debt', 'extra cash', 'fast cash',
    'financial freedom', 'free access', 'free consultation', 'free gift',
    'free hosting', 'free info', 'free investment', 'free membership',
    'free money', 'free preview', 'free quote', 'free trial', 'full refund',
    'get out of debt', 'giveaway', 'guaranteed', 'increase sales', 'increase traffic',
    'incredible deal', 'investment', 'join millions', 'lowest price', 'luxury',
    'marketing', 'money', 'money back', 'no catch', 'no experience', 'no fees',
    'no hidden costs', 'no purchase necessary', 'no strings attached', 'offer',
    'opportunity', 'order', 'order now', 'password', 'potential earnings',
    'prize', 'promise', 'pure profit', 'refinance', 'sale', 'sales', 'save big money',
    'save up to', 'serious cash', 'subject to credit', 'they keep', 'trial',
    'unlimited', 'urgent', 'win', 'winner', 'winning', 'you have been selected'
  ];

  const subjectLower = subject.toLowerCase();
  const foundWords = spamTriggerWords.filter(word => subjectLower.includes(word.toLowerCase()));
  
  return {
    hasSpamWords: foundWords.length > 0,
    words: foundWords
  };
};

/**
 * Calculates the text-to-HTML ratio of an email
 * A good ratio (above 0.3) helps with deliverability
 * 
 * @param htmlContent The HTML content of the email
 * @param textContent The plain text content of the email
 * @returns The text-to-HTML ratio as a number between 0 and 1
 */
export const calculateTextToHtmlRatio = (htmlContent: string, textContent: string): number => {
  if (!htmlContent || htmlContent.length === 0) return 1;
  
  const textLength = textContent.length;
  const htmlLength = htmlContent.length;
  
  return textLength / htmlLength;
};

/**
 * Sanitizes email content to improve deliverability
 * - Removes excessive exclamation marks
 * - Reduces ALL CAPS text
 * - Limits the number of links
 * 
 * @param content The email content to sanitize
 * @returns Sanitized email content
 */
export const sanitizeEmailContent = (content: string): string => {
  let sanitized = content;
  
  // Replace multiple exclamation marks with a single one
  sanitized = sanitized.replace(/!{2,}/g, '!');
  
  // Find ALL CAPS words (4+ characters) and convert to title case
  sanitized = sanitized.replace(/\b[A-Z]{4,}\b/g, (match) => {
    return match.charAt(0) + match.slice(1).toLowerCase();
  });
  
  // Limit the number of links (this is a simple approach - a more sophisticated one would use HTML parsing)
  const linkMatches = sanitized.match(/<a\s+(?:[^>]*?\s+)?href=(["])(.*?)\1/g) || [];
  if (linkMatches.length > 10) {
    console.warn('Email contains many links which may trigger spam filters');
  }
  
  return sanitized;
};
