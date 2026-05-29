import nodemailer from "nodemailer";

export async function sendAppointmentConfirmationMail({ to, name, service, date, time }) {
  const requiredEnv = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
  ];

  const missingEnv = requiredEnv.filter((key) => !process.env[key]);

  if (missingEnv.length > 0) {
    throw new Error(`Missing email env values: ${missingEnv.join(", ")}`);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
 const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: to,
    subject: "Appointment Confirmed — Dr. Charu Garg",
  html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
        
        <h2 style="color: #058FD2; margin-bottom: 4px;">Appointment Confirmed!</h2>
        <p style="color: #64748b; margin-top: 0;">Your booking has been confirmed and payment received.</p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Service</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 13px; font-weight: 600; text-align: right;">${service}</td>
            </tr>
            <tr style="border-top: 1px solid #e2e8f0;">
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Date</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 13px; font-weight: 600; text-align: right;">${formattedDate}</td>
            </tr>
            <tr style="border-top: 1px solid #e2e8f0;">
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Time</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 13px; font-weight: 600; text-align: right;">${time}</td>
            </tr>
            <tr style="border-top: 1px solid #e2e8f0;">
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Amount Paid</td>
              <td style="padding: 8px 0; color: #058FD2; font-size: 13px; font-weight: 600; text-align: right;">₹500</td>
            </tr>
          </table>
        </div>

        <p style="color: #64748b; font-size: 13px;">Please arrive 5 minutes early. For any changes contact us on WhatsApp.</p>
        
        <p style="color: #94a3b8; font-size: 12px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          Dr. Charu Garg — Hair & Scalp Clinic
        </p>
      </div>
    `,
  });
}
