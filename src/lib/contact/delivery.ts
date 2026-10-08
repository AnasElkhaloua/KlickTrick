import {Resend} from "resend";
import type {ContactEmailConfig} from "@/lib/config/server";
import type {ContactInput} from "@/lib/contact/schema";
import {buildContactEmail} from "@/lib/contact/email-template";

type SendResult = {data: {id: string} | null; error: unknown | null};
export type ContactEmailSender = (payload: {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}, options: {idempotencyKey: string}) => Promise<SendResult>;

export type DeliveryResult = {status: "accepted"; id: string} | {status: "failed"};

export async function deliverContactEmail(input: ContactInput, config: ContactEmailConfig, idempotencyKey: string, sender?: ContactEmailSender): Promise<DeliveryResult> {
  const email = buildContactEmail(input);
  const send = sender ?? (async (payload, options) => {
    const resend = new Resend(config.apiKey);
    return resend.emails.send(payload, options);
  });

  try {
    const {data, error} = await send({
      from: config.fromEmail,
      to: [config.toEmail],
      subject: email.subject,
      html: email.html,
      text: email.text,
      ...(input.email ? {replyTo: input.email} : {})
    }, {idempotencyKey});
    if (error || !data?.id) return {status: "failed"};
    return {status: "accepted", id: data.id};
  } catch {
    return {status: "failed"};
  }
}
