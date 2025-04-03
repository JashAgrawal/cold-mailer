"use client";

import React from "react";
import { Book, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GuidesStructuredData from "./guides-structured-data";

const guides = [
  {
    id: "1",
    title: "The Complete Guide to Cold Email",
    description:
      "Learn everything you need to know about cold email, from crafting the perfect subject line to following up effectively.",
    category: "Cold Outreach",
    level: "Beginner",
    slug: "complete-guide-to-cold-email",
  },
  {
    id: "2",
    title: "Email Deliverability: A Technical Guide",
    description:
      "Understand the technical aspects of email deliverability, including SPF, DKIM, DMARC, and how to set them up correctly.",
    category: "Technical",
    level: "Advanced",
    slug: "email-deliverability-technical-guide",
  },
  {
    id: "3",
    title: "Personalization at Scale: The Ultimate Guide",
    description:
      "Discover how to create highly personalized email campaigns that can be scaled to thousands of recipients.",
    category: "Personalization",
    level: "Intermediate",
    slug: "personalization-at-scale",
  },
  {
    id: "4",
    title: "Email Copywriting: Writing Emails That Convert",
    description:
      "Master the art of email copywriting with proven formulas, templates, and examples that drive conversions.",
    category: "Copywriting",
    level: "Intermediate",
    slug: "email-copywriting-guide",
  },
  {
    id: "5",
    title: "Email Automation Workflows for B2B Sales",
    description:
      "Learn how to set up effective email automation workflows that nurture leads and close deals on autopilot.",
    category: "Automation",
    level: "Advanced",
    slug: "email-automation-workflows",
  },
  {
    id: "6",
    title: "Email Analytics: Measuring What Matters",
    description:
      "Understand which email metrics to track and how to use data to continuously improve your email campaigns.",
    category: "Analytics",
    level: "Intermediate",
    slug: "email-analytics-guide",
  },
];

export default function GuidesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <GuidesStructuredData />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Email Marketing Guides
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive resources to help you master email marketing and
                  cold outreach.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search guides..."
                    className="w-full bg-background pl-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  className="group relative flex flex-col rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1.5">
                      <Book className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm font-medium">{guide.category}</div>
                    <div className="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs">
                      {guide.level}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {guide.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-primary">
                    <span>Read guide</span>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to improve your email marketing?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Put these guides into practice with MailMaster's powerful
                  email marketing platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/sign-up">
                  <Button size="lg" className="px-8">
                    Start your free trial
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button size="lg" variant="outline" className="px-8">
                    Explore templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
