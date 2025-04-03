"use client";

import { useEffect } from "react";

export default function GuidesStructuredData() {
  useEffect(() => {
    // Add structured data for guides page
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Email Marketing Guides - MailMaster",
      "description": "Comprehensive guides on email marketing, cold outreach, and improving your email campaigns for better results.",
      "url": "https://mailer.jashagrawal.in/guides",
      "publisher": {
        "@type": "Organization",
        "name": "MailMaster",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mailer.jashagrawal.in/logo.png"
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Article",
              "name": "The Complete Guide to Cold Email",
              "description": "Learn everything you need to know about cold email, from crafting the perfect subject line to following up effectively.",
              "url": "https://mailer.jashagrawal.in/guides/complete-guide-to-cold-email"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Article",
              "name": "Email Deliverability: A Technical Guide",
              "description": "Understand the technical aspects of email deliverability, including SPF, DKIM, DMARC, and how to set them up correctly.",
              "url": "https://mailer.jashagrawal.in/guides/email-deliverability-technical-guide"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Article",
              "name": "Personalization at Scale: The Ultimate Guide",
              "description": "Discover how to create highly personalized email campaigns that can be scaled to thousands of recipients.",
              "url": "https://mailer.jashagrawal.in/guides/personalization-at-scale"
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "Article",
              "name": "Email Copywriting: Writing Emails That Convert",
              "description": "Master the art of email copywriting with proven formulas, templates, and examples that drive conversions.",
              "url": "https://mailer.jashagrawal.in/guides/email-copywriting-guide"
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "Article",
              "name": "Email Automation Workflows for B2B Sales",
              "description": "Learn how to set up effective email automation workflows that nurture leads and close deals on autopilot.",
              "url": "https://mailer.jashagrawal.in/guides/email-automation-workflows"
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "Article",
              "name": "Email Analytics: Measuring What Matters",
              "description": "Understand which email metrics to track and how to use data to continuously improve your email campaigns.",
              "url": "https://mailer.jashagrawal.in/guides/email-analytics-guide"
            }
          }
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://mailer.jashagrawal.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Guides",
            "item": "https://mailer.jashagrawal.in/guides"
          }
        ]
      }
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
