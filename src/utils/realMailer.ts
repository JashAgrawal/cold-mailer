"use server";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const getTransporter = async () => {
  return transporter;
};
