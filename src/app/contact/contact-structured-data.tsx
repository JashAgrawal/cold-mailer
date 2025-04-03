"use client";

import { useEffect } from "react";

export default function ContactStructuredData() {
  useEffect(() => {
    // Add structured data for contact page
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Us - MailMaster",
      "description": "Get in touch with our team for support, feedback, or inquiries about our email marketing platform.",
      "url": "https://mailer.jashagrawal.in/contact",
      "mainEntity": {
        "@type": "Organization",
        "name": "MailMaster",
        "url": "https://mailer.jashagrawal.in",
        "logo": "https://mailer.jashagrawal.in/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91 1234567890",
          "contactType": "customer service",
          "email": "support@mailer.jashagrawal.in",
          "availableLanguage": "English"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Email Street",
          "addressLocality": "Digital City",
          "addressCountry": "India"
        },
        "sameAs": [
          "https://twitter.com/jashagrawal",
          "https://linkedin.com/in/jashagrawal",
          "https://github.com/jashagrawal"
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
            "name": "Contact",
            "item": "https://mailer.jashagrawal.in/contact"
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
