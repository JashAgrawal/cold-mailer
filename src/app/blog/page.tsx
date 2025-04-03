"use client";

import React from "react";
import { Mail, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import BlogStructuredData from "./blog-structured-data";

export const blogPosts = [
  {
    id: "1",
    title: "10 Email Templates That Actually Get Responses",
    excerpt:
      "Discover the proven email templates that have helped our customers achieve 40%+ response rates in their cold outreach campaigns.",
    date: "April 3, 2024",
    author: "Jash Agrawal",
    category: "Email Templates",
    slug: "email-templates-that-get-responses",
  },
  {
    id: "2",
    title: "How to Personalize Your Cold Emails at Scale",
    excerpt:
      "Learn how to use dynamic variables and segmentation to create personalized emails that feel hand-written, even when sending thousands.",
    date: "March 28, 2024",
    author: "Jash Agrawal",
    category: "Personalization",
    slug: "personalize-cold-emails-at-scale",
  },
  {
    id: "3",
    title: "The Ultimate Guide to Email Deliverability",
    excerpt:
      "Ensure your emails reach the inbox, not the spam folder, with these proven deliverability best practices and technical setup tips.",
    date: "March 15, 2024",
    author: "Jash Agrawal",
    category: "Deliverability",
    slug: "email-deliverability-guide",
  },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <BlogStructuredData />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Email Marketing Blog
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Expert tips, strategies, and insights to improve your email
                  marketing and cold outreach campaigns.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 pt-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}?id=${post.id}`}
                  className="group relative overflow-hidden rounded-lg border bg-background p-6 pt-12 shadow-md transition-all hover:shadow-lg"
                >
                  <div className="absolute right-4 top-4 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {post.category}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <div className="text-primary group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="gap-1">
                Load more articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Subscribe to our newsletter
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get the latest email marketing tips and strategies delivered
                  straight to your inbox.
                </p>
              </div>
              <div className="mx-auto w-full max-w-md space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
