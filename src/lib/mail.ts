
import { config } from "dotenv";
config();

import { Resend } from "resend";
import { getEmailTemplate } from "./email-templates";
import type { Property } from "./data";

// ------------------------------
// LAZY INITIALIZATION (ANTI-CRASH)
// ------------------------------
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;

  // Empêche le crash pendant le build Turbopack
  return new Resend(apiKey || "re_dummy_key_for_build");
};

// ------------------------------
// HELPERS
// ------------------------------
const getSenderDetails = () => {
  return { senderName: "StayFloow", senderEmail: "onboarding@resend.dev" };
};

const getRecipientEmail = (intendedRecipient: string) => {
  console.log(
    `Email originally intended for ${intendedRecipient} is being redirected to admin for testing.`
  );
  return "stayflow2025@gmail.com";
};

// ------------------------------
// 1. WELCOME EMAIL
// ------------------------------
interface WelcomeEmailProps {
  hostName: string;
  submissionType: "propriété" | "véhicule" | "circuit";
  submissionName: string;
  hostEmail: string;
  referenceNumber: string;
  cleaningServiceRequested?: boolean;
}

export const sendWelcomeEmail = async ({
  hostName,
  submissionType,
  submissionName,
  hostEmail,
  referenceNumber,
  cleaningServiceRequested,
}: WelcomeEmailProps) => {
  const resend = getResend();

  const { senderName, senderEmail } = getSenderDetails();
  const fromAddress = `${senderName} <${senderEmail}>`;

  const setupToken = `partner-setup-token-${Date.now()}`;
  const setupLink = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002"
  }/partner/reset-password?token=${setupToken}`;

  const { subject, body } = await getEmailTemplate("partnerWelcome", {
    hostName,
    submissionType:
      submissionType === "circuit" ? "circuit / activité" : submissionType,
    submissionName,
    referenceNumber,
    setupLink,
    cleaningServiceRequested: !!cleaningServiceRequested,
  });

  const toAddress = getRecipientEmail(hostEmail);

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject,
      html: body,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error: { message: (error as Error).message } };
  }
};

// ------------------------------
// 2. BOOKING CONFIRMATION
// ------------------------------
interface BookingConfirmationEmailProps {
  customerName: string;
  customerEmail: string;
  reservationNumber: string;
  itemName: string;
  itemType: "hébergement" | "véhicule" | "circuit";
  hostName: string;
  hostEmail: string;
  hostPhone: string;
  bookingDetails: {
    startDate?: string | null;
    endDate?: string | null;
    duration?: number;
    participants?: number;
  };
}

export const sendBookingConfirmationEmail = async ({
  customerName,
  customerEmail,
  reservationNumber,
  itemName,
  itemType,
  hostName,
  hostEmail,
  hostPhone,
  bookingDetails,
}: BookingConfirmationEmailProps) => {
  const resend = getResend();

  const { senderName, senderEmail } = getSenderDetails();
  const fromAddress = `${senderName} <${
    senderEmail.replace("@", ".booking@") || "booking@resend.dev"
  }>`;

  const toAddress = getRecipientEmail(customerEmail);

  let detailsHtml = "";
  if (bookingDetails.startDate) {
    if (itemType === "circuit") {
      detailsHtml += `<p><strong>Date de départ :</strong> ${new Date(
        bookingDetails.startDate
      ).toLocaleDateString("fr-FR")}</p>`;
    } else {
      detailsHtml += `<p><strong>Arrivée :</strong> ${new Date(
        bookingDetails.startDate
      ).toLocaleDateString("fr-FR")}</p>`;
    }
  }
  if (bookingDetails.endDate) {
    detailsHtml += `<p><strong>Départ :</strong> ${new Date(
      bookingDetails.endDate
    ).toLocaleDateString("fr-FR")}</p>`;
  }
  if (bookingDetails.duration) {
    detailsHtml += `<p><strong>Durée :</strong> ${
      bookingDetails.duration
    } ${bookingDetails.duration > 1 ? "jours" : "jour"}</p>`;
  }
  if (bookingDetails.participants) {
    detailsHtml += `<p><strong>Participants :</strong> ${bookingDetails.participants}</p>`;
  }

  const { subject, body } = await getEmailTemplate("bookingConfirmation", {
    customerName,
    reservationNumber,
    itemName,
    detailsHtml,
    hostName,
    hostEmail,
    hostPhone,
    itemType:
      itemType === "hébergement"
        ? "hôte"
        : itemType === "véhicule"
        ? "loueur"
        : "guide",
  });

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: subject.replace("{{reservationNumber}}", reservationNumber),
      html: body,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error: { message: (error as Error).message } };
  }
};

// ------------------------------
// 3. NEW BOOKING NOTIFICATION
// ------------------------------
interface NewBookingNotificationProps {
  partnerName: string;
  partnerEmail: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationNumber: string;
  itemName: string;
  bookingDetails: {
    startDate: string | null;
    endDate: string | null;
    duration?: number;
    participants?: number;
  };
}

export const sendNewBookingNotificationEmail = async ({
  partnerName,
  partnerEmail,
  customerName,
  customerEmail,
  customerPhone,
  reservationNumber,
  itemName,
  bookingDetails,
}: NewBookingNotificationProps) => {
  const resend = getResend();

  const { senderName, senderEmail } = getSenderDetails();
  const fromAddress = `${senderName} <${
    senderEmail.replace("@", ".partners@") || "partners@resend.dev"
  }>`;

  const toAddress = getRecipientEmail(partnerEmail);

  const formatForICS = (dateStr: string) => {
    const date = new Date(dateStr);
    return (
      date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    );
  };

  let attachments: any[] = [];
  let detailsHtml = "";

  if (bookingDetails.startDate) {
    const calendarStartDate = formatForICS(bookingDetails.startDate);
    const calendarEndDate = bookingDetails.endDate
      ? formatForICS(bookingDetails.endDate)
      : calendarStartDate;

    let summary = `Réservation StayFloow: ${customerName} pour ${itemName}`;
    if (bookingDetails.participants) {
      summary += ` (${bookingDetails.participants} personnes)`;
    }

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//StayFloow//Booking Calendar//FR",
      "BEGIN:VEVENT",
      `UID:${reservationNumber}@stay-flow.com`,
      `DTSTAMP:${new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z"}`,
      `DTSTART;VALUE=DATE:${calendarStartDate.substring(0, 8)}`,
      `DTEND;VALUE=DATE:${calendarEndDate.substring(0, 8)}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:Nouvelle réservation #${reservationNumber} pour ${itemName}.\\nClient: ${customerName}\\nContact: ${customerEmail} / ${customerPhone}.`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    attachments.push({
      filename: "reservation.ics",
      content: icsContent,
    });

    detailsHtml += `<p><strong>Date de début :</strong> ${new Date(
      bookingDetails.startDate
    ).toLocaleDateString("fr-FR")}</p>`;
  }

  if (bookingDetails.endDate) {
    detailsHtml += `<p><strong>Date de fin :</strong> ${new Date(
      bookingDetails.endDate
    ).toLocaleDateString("fr-FR")}</p>`;
  }

  if (bookingDetails.duration) {
    detailsHtml += `<p><strong>Durée :</strong> ${
      bookingDetails.duration
    } ${bookingDetails.duration > 1 ? "jours/nuits" : "jour/nuit"}</p>`;
  }

  if (bookingDetails.participants) {
    detailsHtml += `<p><strong>Participants :</strong> ${bookingDetails.participants}</p>`;
  }

  const { subject, body } = await getEmailTemplate(
    "newBookingNotification",
    {
      partnerName,
      itemName,
      reservationNumber,
      detailsHtml,
      customerName,
      customerEmail,
      customerPhone,
    }
  );

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: subject
        .replace("{{itemName}}", itemName)
        .replace("{{reservationNumber}}", reservationNumber),
      html: body,
      attachments,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error: { message: (error as Error).message } };
  }
};

// ------------------------------
// 4. FAVORITE REMINDER
// ------------------------------
interface FavoriteReminderEmailProps {
  customerName: string;
  customerEmail: string;
  property: Property;
}

export const sendFavoriteReminderEmail = async ({
  customerName,
  customerEmail,
  property,
}: FavoriteReminderEmailProps) => {
  const resend = getResend();

  const { senderName, senderEmail } = getSenderDetails();
  const fromAddress = `${senderName} <${
    senderEmail.replace("@", ".reminders@") || "reminders@resend.dev"
  }>`;

  const toAddress = getRecipientEmail(customerEmail);

  const { subject, body } = await getEmailTemplate("favoriteReminder", {
    customerName,
    propertyName: property.name,
    propertyDescription: property.description,
    propertyImage: property.images[0],
    propertyUrl: `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002"
    }/properties/${property.id}`,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject,
      html: body,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error: { message: (error as Error).message } };
  }
};

// ------------------------------
// 5. ADMIN NOTIFICATION
// ------------------------------
interface NewSubmissionAdminNotificationProps {
  submissionType: "Hébergement" | "Véhicule" | "Circuit / Activité";
  submissionName: string;
  partnerName: string;
  partnerEmail: string;
  partnerPhone: string;
}

export const sendNewSubmissionAdminNotification = async ({
  submissionType,
  submissionName,
  partnerName,
  partnerEmail,
  partnerPhone,
}: NewSubmissionAdminNotificationProps) => {
  const resend = getResend();

  const { senderName, senderEmail } = getSenderDetails();
  const fromAddress = `${senderName} <${
    senderEmail.replace("@", ".admin-alerts@") || "alerts@resend.dev"
  }>`;

  const toAddress = "stayflow2025@gmail.com";
  const adminUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002"
  }/admin/approvals`;

  const { subject, body } = await getEmailTemplate(
    "newSubmissionAdminNotification",
    {
      submissionType,
      submissionName,
      partnerName,
      partnerEmail,
      partnerPhone,
      adminUrl,
    }
  );

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject,
      html: body,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error: { message: (error as Error).message } };
  }
};

// ------------------------------
// 6. PASSWORD RESET
// ------------------------------
interface PasswordResetEmailProps {
  userEmail: string;
  userType: "admin" | "partner" | "customer";
}

export const sendPasswordResetEmail = async ({
  userEmail,
  userType,
}: PasswordResetEmailProps) => {
  const resend = getResend();

  const { senderName, senderEmail } = getSenderDetails();
  const fromAddress = `${senderName} <${
    senderEmail.replace("@", ".security@") || "security@resend.dev"
  }>`;

  const resetToken = "mock-reset-token-12345";

  let page = "/reset-password";
  if (userType === "admin") page = "/admin/reset-password";
  if (userType === "partner") page = "/partner/reset-password";

  const resetLink = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002"
  }${page}?token=${resetToken}`;

  const { subject, body } = await getEmailTemplate("passwordReset", {
    resetLink,
  });

  const toAddress = getRecipientEmail(userEmail);

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject,
      html: body,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error: { message: (error as Error).message } };
  }
};
