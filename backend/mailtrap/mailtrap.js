import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();


const TOKEN = process.env.MAILTRAP_API_TOKEN;

export const mailClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};