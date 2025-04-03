"use client";

import { useEffect } from "react";

export default function TemplatesStructuredData() {
  useEffect(() => {
    // Add structured data for templates page
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Email Templates - MailMaster",
      "description": "Create and manage your email templates with dynamic variables for personalized outreach campaigns.",
      "url": "https://mailer.jashagrawal.in/templates",
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
            "name": "Email Templates",
            "item": "https://mailer.jashagrawal.in/templates"
          }
        ]
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Email Template Manager",
              "applicationCategory": "BusinessApplication",
              "description": "Create and manage email templates with dynamic variables for personalized outreach."
            }
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
