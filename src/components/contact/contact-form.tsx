"use client";

import {useActionState, useRef, useState} from "react";
import {useFormStatus} from "react-dom";
import {submitContact} from "@/app/[locale]/contact/actions";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils/cn";
import {initialContactFormState, type ContactFormState} from "@/lib/contact/form-state";

type SubjectOption = {value: string; label: string};

type ContactFormProps = {
  locale: "fr" | "en";
  copy: {
    firstName: string;
    phone: string;
    email: string;
    emailOptional: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    submit: string;
    submitting: string;
    privacy: string;
  };
  subjects: SubjectOption[];
};

function SubmitButton({label, pendingLabel}: {label: string; pendingLabel: string}) {
  const {pending} = useFormStatus();
  return <Button type="submit" disabled={pending} aria-disabled={pending} className="w-full disabled:cursor-wait disabled:opacity-65 sm:w-auto">{pending ? pendingLabel : label}</Button>;
}

function FieldError({errors, id}: {errors?: string[]; id: string}) {
  if (!errors?.length) return null;
  return <p id={id} className="mt-2 text-sm leading-6 text-[#ff9d9d]">{errors[0]}</p>;
}

const fieldClassName = "min-h-13 w-full rounded-2xl border border-white/12 bg-black/35 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/30 focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/25";
const emptyValues = {firstName: "", phone: "", email: "", subject: "", message: ""};

export function ContactForm({locale, copy, subjects}: ContactFormProps) {
  const [values, setValues] = useState(emptyValues);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(async (previousState: ContactFormState, formData: FormData) => {
    const nextState = await submitContact(previousState, formData);
    if (nextState.status === "success") {
      setValues(emptyValues);
      formRef.current?.reset();
    }
    return nextState;
  }, initialContactFormState);

  const describedBy = (field: string) => state.fieldErrors[field as keyof typeof state.fieldErrors]?.length ? `${field}-error` : undefined;
  const updateValue = (field: keyof typeof values, value: string) => {
    setValues((current) => ({...current, [field]: value}));
  };

  return (
    <form ref={formRef} action={formAction} noValidate className="mt-9" aria-describedby="contact-privacy">
      <input type="hidden" name="locale" value={locale}/>
      <div className="absolute left-[-10000px] top-auto size-px overflow-hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off"/></div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div><label htmlFor="firstName" className="text-sm font-medium text-white">{copy.firstName} <span className="text-[var(--color-mint)]" aria-hidden="true">*</span></label><input id="firstName" name="firstName" type="text" required maxLength={80} autoComplete="given-name" value={values.firstName} onChange={(event) => updateValue("firstName", event.target.value)} aria-invalid={Boolean(state.fieldErrors.firstName)} aria-describedby={describedBy("firstName")} className={cn(fieldClassName, "mt-2")}/><FieldError errors={state.fieldErrors.firstName} id="firstName-error"/></div>
        <div><label htmlFor="phone" className="text-sm font-medium text-white">{copy.phone} <span className="text-[var(--color-mint)]" aria-hidden="true">*</span></label><input id="phone" name="phone" type="tel" required maxLength={32} autoComplete="tel" inputMode="tel" value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} aria-invalid={Boolean(state.fieldErrors.phone)} aria-describedby={describedBy("phone")} className={cn(fieldClassName, "mt-2")}/><FieldError errors={state.fieldErrors.phone} id="phone-error"/></div>
      </div>
      <div className="mt-6"><label htmlFor="email" className="text-sm font-medium text-white">{copy.email} <span className="text-white/60">({copy.emailOptional})</span></label><input id="email" name="email" type="email" maxLength={254} autoComplete="email" inputMode="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} aria-invalid={Boolean(state.fieldErrors.email)} aria-describedby={describedBy("email")} className={cn(fieldClassName, "mt-2")}/><FieldError errors={state.fieldErrors.email} id="email-error"/></div>
      <div className="mt-6"><label htmlFor="subject" className="text-sm font-medium text-white">{copy.subject} <span className="text-[var(--color-mint)]" aria-hidden="true">*</span></label><select id="subject" name="subject" required value={values.subject} onChange={(event) => updateValue("subject", event.target.value)} aria-invalid={Boolean(state.fieldErrors.subject)} aria-describedby={describedBy("subject")} className={cn(fieldClassName, "mt-2 appearance-none")}><option value="" disabled>{copy.subjectPlaceholder}</option>{subjects.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><FieldError errors={state.fieldErrors.subject} id="subject-error"/></div>
      <div className="mt-6"><label htmlFor="message" className="text-sm font-medium text-white">{copy.message} <span className="text-[var(--color-mint)]" aria-hidden="true">*</span></label><textarea id="message" name="message" required maxLength={3000} rows={7} value={values.message} onChange={(event) => updateValue("message", event.target.value)} aria-invalid={Boolean(state.fieldErrors.message)} aria-describedby={describedBy("message")} className={cn(fieldClassName, "mt-2 resize-y")}/><FieldError errors={state.fieldErrors.message} id="message-error"/></div>
      <p id="contact-privacy" className="mt-6 text-xs leading-6 text-white/50">{copy.privacy}</p>
      {state.message ? <div role={state.status === "success" ? "status" : "alert"} aria-live="polite" className={cn("mt-6 rounded-2xl border px-4 py-3 text-sm leading-6", state.status === "success" ? "border-[var(--color-mint)]/30 bg-[var(--color-mint)]/8 text-[var(--color-mint)]" : "border-[#ff9d9d]/30 bg-[#ff9d9d]/8 text-[#ffb5b5]")}>{state.message}</div> : null}
      <div className="mt-7"><SubmitButton label={copy.submit} pendingLabel={copy.submitting}/></div>
    </form>
  );
}
