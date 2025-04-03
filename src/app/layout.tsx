import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mailer.jashagrawal.in"),
  title: "MailMaster - Email Marketing & Cold Outreach Platform",
  description:
    "Create personalized email campaigns, manage templates with dynamic variables, and track performance metrics. Boost your cold outreach effectiveness with MailMaster.",
  keywords: [
    "email marketing",
    "cold email",
    "email templates",
    "personalized emails",
    "email campaigns",
    "email tracking",
    "outreach tool",
    "email automation",
  ],
  authors: [{ name: "Jash Agrawal" }],
  creator: "Jash Agrawal",
  publisher: "Jash Agrawal",
  applicationName: "MailMaster",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mailer.jashagrawal.in",
    title: "MailMaster - Email Marketing & Cold Outreach Platform",
    description:
      "Create personalized email campaigns, manage templates with dynamic variables, and track performance metrics. Boost your cold outreach effectiveness with MailMaster.",
    siteName: "MailMaster",
    images: [
      {
        url: "https://mailer.jashagrawal.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "MailMaster - Email Marketing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MailMaster - Email Marketing & Cold Outreach Platform",
    description:
      "Create personalized email campaigns, manage templates with dynamic variables, and track performance metrics. Boost your cold outreach effectiveness.",
    images: ["https://mailer.jashagrawal.in/twitter-image.png"],
    creator: "@jashagrawal",
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code when you have it
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
