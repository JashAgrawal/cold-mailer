"use client";

import { useEffect } from "react";

export default function BlogPostStructuredData() {
  useEffect(() => {
    // Add structured data for blog post
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "10 Email Templates That Actually Get Responses",
      "description": "Discover the proven email templates that have helped our customers achieve 40%+ response rates in their cold outreach campaigns.",
      "image": "https://mailer.jashagrawal.in/blog/email-templates-image.jpg",
      "datePublished": "2024-04-03T08:00:00+00:00",
      "dateModified": "2024-04-03T08:00:00+00:00",
      "author": {
        "@type": "Person",
        "name": "Jash Agrawal"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MailMaster",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mailer.jashagrawal.in/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://mailer.jashagrawal.in/blog/email-templates-that-get-responses"
      },
      "keywords": [
        "email templates",
        "cold email",
        "email marketing",
        "response rates",
        "outreach",
        "sales emails",
        "email campaigns"
      ],
      "articleBody": "Crafting the perfect cold email is both an art and a science. At MailMaster, we've analyzed thousands of successful email campaigns to identify what actually works. In this article, we'll share 10 proven email templates that consistently get high response rates.",
      "articleSection": "Email Marketing",
      "wordCount": "1200"
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
