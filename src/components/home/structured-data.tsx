"use client";

import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    // Add structured data to the page
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "MailMaster",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "127"
      },
      "description": "Create personalized email campaigns, manage templates with dynamic variables, and track performance metrics. Boost your cold outreach effectiveness with MailMaster.",
      "screenshot": "https://mailer.jashagrawal.in/og-image.png",
      "featureList": "Email Templates, Personalization, Email Tracking, Campaign Management",
      "softwareHelp": "https://mailer.jashagrawal.in/help",
      "author": {
        "@type": "Person",
        "name": "Jash Agrawal"
      },
      "provider": {
        "@type": "Organization",
        "name": "MailMaster",
        "url": "https://mailer.jashagrawal.in"
      },
      "potentialAction": {
        "@type": "ViewAction",
        "target": "https://mailer.jashagrawal.in/sign-up"
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
