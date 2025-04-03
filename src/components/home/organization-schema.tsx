"use client";

import { useEffect } from "react";

export default function OrganizationSchema() {
  useEffect(() => {
    // Add organization structured data
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "MailMaster",
      "url": "https://mailer.jashagrawal.in",
      "logo": "https://mailer.jashagrawal.in/logo.png",
      "description": "MailMaster is an email marketing platform that helps businesses create personalized email campaigns, manage templates with dynamic variables, and track performance metrics.",
      "sameAs": [
        "https://twitter.com/jashagrawal",
        "https://linkedin.com/in/jashagrawal",
        "https://github.com/jashagrawal"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "India"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@mailer.jashagrawal.in",
        "availableLanguage": "English"
      },
      "founder": {
        "@type": "Person",
        "name": "Jash Agrawal"
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
