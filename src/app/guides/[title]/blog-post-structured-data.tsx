"use client";
import { blogPosts } from "@/app/guides/data";
import { useEffect } from "react";

export default function BlogPostStructuredData({ id }: { id: string }) {
  useEffect(() => {
    // Add structured data for blog post
    const blog = blogPosts.find((post) => post.id === id);
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog?.title,
      description: blog?.content.slice(0, 100) + "...",
      image: "https://mailer.jashagrawal.in/blog/email-templates-image.jpg",
      datePublished: "2024-04-03T08:00:00+00:00",
      dateModified: "2024-04-03T08:00:00+00:00",
      author: {
        "@type": "Person",
        name: "Jash Agrawal",
      },
      publisher: {
        "@type": "Organization",
        name: "MailMaster",
        logo: {
          "@type": "ImageObject",
          url: "https://mailer.jashagrawal.in/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id":
          "https://mailer.jashagrawal.in/blog/" +
          blog?.slug +
          "?id=" +
          blog?.id,
      },
      keywords: [
        "email templates",
        "cold email",
        "email marketing",
        "response rates",
        "outreach",
        "sales emails",
        "email campaigns",
      ],
      articleBody: blog?.content,
      articleSection: blog?.category,
      wordCount: blog?.content.length,
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
