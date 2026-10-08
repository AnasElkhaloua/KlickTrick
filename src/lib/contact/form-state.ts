import type {ContactField} from "@/lib/contact/schema";

export type ContactFormState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: Partial<Record<ContactField, string[]>>;
};

export const initialContactFormState: ContactFormState = {status: "idle", message: "", fieldErrors: {}};
