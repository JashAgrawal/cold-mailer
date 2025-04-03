"use client";

import { useEffect } from "react";

export default function BlogStructuredData() {
  useEffect(() => {
    // Add structured data for blog page
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Email Marketing Blog - MailMaster",
      "description": "Learn about email marketing best practices, cold outreach strategies, and how to improve your email campaigns.",
      "url": "https://mailer.jashagrawal.in/blog",
      "publisher": {
        "@type": "Organization",
        "name": "MailMaster",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mailer.jashagrawal.in/logo.png"
        }
      },
      "blogPost": [
        {
          "@type": "BlogPosting",
          "headline": "10 Email Templates That Actually Get Responses",
          "description": "Discover the proven email templates that have helped our customers achieve 40%+ response rates in their cold outreach campaigns.",
          "datePublished": "2024-04-03T08:00:00+00:00",
          "author": {
            "@type": "Person",
            "name": "Jash Agrawal"
          },
          "url": "https://mailer.jashagrawal.in/blog/email-templates-that-get-responses"
        },
        {
          "@type": "BlogPosting",
          "headline": "How to Personalize Your Cold Emails at Scale",
          "description": "Learn how to use dynamic variables and segmentation to create personalized emails that feel hand-written, even when sending thousands.",
          "datePublished": "2024-03-28T08:00:00+00:00",
          "author": {
            "@type": "Person",
            "name": "Jash Agrawal"
          },
          "url": "https://mailer.jashagrawal.in/blog/personalize-cold-emails-at-scale"
        },
        {
          "@type": "BlogPosting",
          "headline": "The Ultimate Guide to Email Deliverability",
          "description": "Ensure your emails reach the inbox, not the spam folder, with these proven deliverability best practices and technical setup tips.",
          "datePublished": "2024-03-15T08:00:00+00:00",
          "author": {
            "@type": "Person",
            "name": "Jash Agrawal"
          },
          "url": "https://mailer.jashagrawal.in/blog/email-deliverability-guide"
        }
      ]
    };
    
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      // Clean up
      document.head.removeChild(script);
    };
  }, []);
  
  return null;
}
