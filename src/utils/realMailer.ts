"use server";
import { createTransport } from "nodemailer";

/**
 * Creates and configures a Nodemailer transporter with optimized settings for deliverability
 *
 * @param email The sender's email address
 * @param password The sender's password or app password
 * @returns Configured Nodemailer transporter
 */
export const getTransporter = async (email: string, password: string) => {
  const transporter = createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
    // Connection pool for better performance and reliability
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    // Rate limiting to avoid triggering spam filters
    rateLimit: 5, // max 5 messages per second
    rateDelta: 1000, // define the time window in milliseconds
    // TLS configuration for security
    tls: {
      // Reject unauthorized certificates
      rejectUnauthorized: true,
      // Minimum TLS version
      minVersion: "TLSv1.2"
    }
  });

  // Verify SMTP connection configuration
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
  } catch (error) {
    console.error('SMTP connection verification failed:', error);
  }

  return transporter;
};
