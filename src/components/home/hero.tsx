"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Send,
  Settings,
  Users,
  CheckCircle,
  BarChart,
  Clock,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Navbar from "../common/navbar";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className=" px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create Personalized Email Campaigns That Convert
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Design templates with dynamic variables, personalize at
                    scale, and track results—all in one platform. Boost your
                    cold outreach effectiveness with MailMaster.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row items-center">
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <Link href="/templates">
                      <Button size="lg" className="px-8">
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="px-8">
                      See how it works
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px] overflow-hidden rounded-xl border bg-background p-2 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg"></div>
                  <div className="relative h-full w-full rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="font-medium">New Template</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Save
                      </Button>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="text-sm font-medium">Subject</label>
                        <Input
                          defaultValue="Special offer for [first_name] from [company_name]"
                          className="mt-1"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Email Body
                        </label>
                        <div className="mt-1 rounded-md border p-3 min-h-[200px] text-sm">
                          <p>Hi {`[first_name]`},</p>
                          <br />
                          <p>
                            I noticed that {`[company_name]`} has been growing
                            rapidly in the {`[industry]`} space.
                          </p>
                          <br />
                          <p>
                            We've helped companies like yours increase their
                            outreach efficiency by {`[percentage]`}%.
                          </p>
                          <br />
                          <p>
                            Would you be interested in a quick 15-minute call
                            this {`[day_of_week]`}?
                          </p>
                          <br />
                          <p>
                            Best regards,
                            <br />
                            {`[sender_name]`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need for effective cold emailing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our platform streamlines your outreach process from template
                  creation to performance analysis. MailMaster helps you create
                  personalized email campaigns that get results.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Dynamic Templates</h3>
                <p className="text-center text-muted-foreground">
                  Create reusable email templates with custom variables that
                  automatically personalize for each recipient.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Recipient Management</h3>
                <p className="text-center text-muted-foreground">
                  Import and organize your contacts with custom parameters for
                  each recipient.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Send className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Scheduled Sending</h3>
                <p className="text-center text-muted-foreground">
                  Schedule campaigns to send at optimal times for maximum
                  engagement.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                <p className="text-center text-muted-foreground">
                  Track opens, clicks, replies, and conversions to optimize your
                  campaigns.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Automated Follow-ups</h3>
                <p className="text-center text-muted-foreground">
                  Set up automated follow-up sequences based on recipient
                  actions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Deliverability Tools</h3>
                <p className="text-center text-muted-foreground">
                  Ensure your emails reach the inbox with our deliverability
                  optimization tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Three simple steps to personalized outreach
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our intuitive platform makes it easy to create, personalize,
                  and send email campaigns at scale.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Create Templates</h3>
                  <p className="text-muted-foreground">
                    Design your email templates with dynamic variables like{" "}
                    {`{{first_name}}`}, {`{{company_name}}`}, and more.
                  </p>
                </div>
                <div className="absolute right-0 top-6 hidden h-0.5 w-full bg-muted lg:block"></div>
              </div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Add Recipients</h3>
                  <p className="text-muted-foreground">
                    Import your contact list and add custom parameters for each
                    recipient to personalize your emails.
                  </p>
                </div>
                <div className="absolute right-0 top-6 hidden h-0.5 w-full bg-muted lg:block"></div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Send & Track</h3>
                  <p className="text-muted-foreground">
                    Schedule your campaign, send personalized emails, and track
                    performance in real-time.
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-3xl">
              <div className="overflow-hidden rounded-xl border bg-background shadow-lg">
                <div className="grid grid-cols-3 border-b">
                  <div className="border-r p-4 text-center">
                    <div className="text-2xl font-bold">1,000+</div>
                    <div className="text-sm text-muted-foreground">
                      Templates Created
                    </div>
                  </div>
                  <div className="border-r p-4 text-center">
                    <div className="text-2xl font-bold">5M+</div>
                    <div className="text-sm text-muted-foreground">
                      Emails Sent
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-2xl font-bold">35%</div>
                    <div className="text-sm text-muted-foreground">
                      Avg. Open Rate
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">See it in action</h4>
                      <p className="text-sm text-muted-foreground">
                        Watch how easy it is to create and send personalized
                        email campaigns.
                      </p>
                    </div>
                    <Link href="#demo">
                      <Button>Watch Demo</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple, transparent pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Choose the plan that's right for your business. All plans
                  include a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-muted-foreground">
                    Perfect for individuals and small teams.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 5,000 emails/month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>10 email templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Email support</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/signup?plan=starter">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Professional</h3>
                  <p className="text-muted-foreground">
                    Ideal for growing businesses.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 20,000 emails/month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority email support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Automated follow-ups</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/signup?plan=professional">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">
                    For large organizations with advanced needs.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited emails</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>SSO & advanced security</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/signup?plan=enterprise">
                    <Button className="w-full">Contact Sales</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trusted by businesses worldwide
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  See what our customers have to say about MailMaster.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://api.dicebear.com/9.x/pixel-art/svg?seed=1"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">
                      Marketing Director, TechCorp
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm">
                    "MailMaster has transformed our outreach strategy. The
                    personalization capabilities are unmatched, and we've seen a
                    40% increase in response rates."
                  </p>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://api.dicebear.com/9.x/pixel-art/svg?seed=2"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Michael Chen</h4>
                    <p className="text-sm text-muted-foreground">
                      Sales Manager, GrowthIQ
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm">
                    "The ability to create dynamic templates and track
                    performance has been a game-changer for our sales team.
                    We've closed 25% more deals since using MailMaster."
                  </p>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://api.dicebear.com/9.x/pixel-art/svg?seed=3"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Emily Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">
                      Founder, StartupLaunch
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm">
                    "As a startup founder, I need tools that scale with my
                    business. MailMaster's intuitive interface and powerful
                    features have made our outreach efforts so much more
                    effective."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Frequently asked questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Everything you need to know about MailMaster.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium">
                  How does the variable system work?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Our variable system uses double curly braces like{" "}
                  {"{{variable_name}}"} to create dynamic content. You can
                  create custom variables for each recipient, and our system
                  will automatically replace them with the appropriate values
                  when sending emails.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium">
                  Can I import my existing contacts?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, you can import contacts via CSV or Excel files. Our
                  system will map your columns to variables that you can use in
                  your templates.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium">
                  How do I track the performance of my campaigns?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  MailMaster provides comprehensive analytics including open
                  rates, click rates, reply rates, and conversion tracking. You
                  can view these metrics in real-time on your dashboard.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium">
                  Is there a limit to how many emails I can send?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Each plan has different email sending limits. The Starter plan
                  includes 5,000 emails per month, Professional includes 20,000,
                  and Enterprise offers unlimited emails.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-medium">
                  How do you ensure deliverability?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  We use industry-leading practices to ensure high
                  deliverability, including SPF, DKIM, and DMARC authentication,
                  dedicated IPs for higher-tier plans, and deliverability
                  monitoring tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to transform your email outreach?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of businesses that use MailMaster to create
                  personalized email campaigns that convert.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="px-8">
                    Start your free trial
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="px-8">
                    Schedule a demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                No credit card required. 14-day free trial. Cancel anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background px-6">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">MailMaster</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Create personalized email campaigns, manage templates with
                dynamic variables, and track performance metrics.
              </p>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} MailMaster. All rights
                reserved.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Email Marketing Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/templates"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Template Gallery
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              MailMaster is an email marketing platform that helps businesses
              create personalized email campaigns.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://twitter.com/jashagrawal"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="https://linkedin.com/in/jashagrawal"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/jashagrawal"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
