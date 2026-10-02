import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(to: string, link: string) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM;
  const port = Number(process.env.SMTP_PORT ?? "587");
  if (!host || !user || !password || !from || !Number.isInteger(port)) throw new Error("SMTP is not fully configured.");
  const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass: password } });
  await transport.sendMail({ from, to, subject: "A secure link to reset your Adlac password", text: `We received a request to reset your Adlac Realty password. This one-time link expires in 30 minutes:\n\n${link}\n\nIf you did not request this, you can ignore this message.`, html: `<p>We received a request to reset your Adlac Realty password.</p><p><a href="${link}">Choose a new password</a></p><p>This one-time link expires in 30 minutes. If you did not request this, you can ignore this message.</p>` });
}
