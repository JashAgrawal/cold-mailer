"use server";
import { createTransport } from "nodemailer";



export const getTransporter = async (email:string,password:string) => {
  const transporter = createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
  });
  return transporter;
};
