"use client";

import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ContactStructuredData from "./contact-structured-data";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a server
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ContactStructuredData />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Contact Us
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions or feedback? We'd love to hear from you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground">
                    Fill out the form and our team will get back to you within
                    24 hours.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">
                        support@mailer.jashagrawal.in
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+91 1234567890</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">
                        123 Email Street, Digital City, India
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://twitter.com/jashagrawal"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Twitter
                    </a>
                    <a
                      href="https://linkedin.com/in/jashagrawal"
                      className="text-muted-foreground hover:text-primary"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/jashagrawal"
                      className="text-muted-foreground hover:text-primary"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reason for contact</Label>
                    <RadioGroup defaultValue="support">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="support" id="support" />
                        <Label htmlFor="support" className="cursor-pointer">
                          Support
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sales" id="sales" />
                        <Label htmlFor="sales" className="cursor-pointer">
                          Sales
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="feedback" id="feedback" />
                        <Label htmlFor="feedback" className="cursor-pointer">
                          Feedback
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="cursor-pointer">
                          Other
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about MailMaster.
                </p>
              </div>
              <div className="mx-auto max-w-3xl space-y-4 pt-8">
                <div className="rounded-lg border bg-background p-6">
                  <h3 className="text-lg font-medium">
                    How do I get started with MailMaster?
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Simply sign up for a free account, create your first email
                    template, add recipients, and you're ready to send
                    personalized emails.
                  </p>
                </div>
                <div className="rounded-lg border bg-background p-6">
                  <h3 className="text-lg font-medium">
                    What payment methods do you accept?
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    We accept all major credit cards, PayPal, and bank transfers
                    for annual plans.
                  </p>
                </div>
                <div className="rounded-lg border bg-background p-6">
                  <h3 className="text-lg font-medium">
                    Can I cancel my subscription at any time?
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, you can cancel your subscription at any time from your
                    account settings. There are no cancellation fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
