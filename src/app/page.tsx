import LandingPage from "@/components/home/hero";
import StructuredData from "@/components/home/structured-data";
import OrganizationSchema from "@/components/home/organization-schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MailMaster - Email Marketing & Cold Outreach Platform",
  description:
    "Create personalized email campaigns, manage templates with dynamic variables, and track performance metrics. Boost your cold outreach effectiveness with MailMaster.",
  alternates: {
    canonical: "https://mailer.jashagrawal.in",
  },
};

// Main
export default function Page() {
  return (
    <>
      <StructuredData />
      <OrganizationSchema />
      <LandingPage />
    </>
  );
}
