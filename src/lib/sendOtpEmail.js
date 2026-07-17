import nodemailer from "nodemailer";

export async function sendOtpEmail({ email, otp }) {
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

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Your login OTP",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    html: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0F8FC; padding:32px 0; font-family: Arial, Helvetica, sans-serif;">
        <tr>
          <td align="center">
            <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border:1px solid #DDEAF2; border-radius:12px; overflow:hidden;">

              <!-- Header -->
              <tr>
                <td style="background-color:#058FD2; padding:20px 32px;">
                  <p style="margin:0; font-size:16px; font-weight:bold; color:#FFFFFF; letter-spacing:0.3px;">
                    Dr. Charu Garg
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:32px;">
                  <p style="margin:0 0 4px; font-size:14px; color:#131C15;">
                    Hello,
                  </p>
                  <p style="margin:0 0 24px; font-size:14px; color:#555555; line-height:1.6;">
                    Use the one-time password below to complete your login. This code is valid for the next 10 minutes.
                  </p>

                  <!-- OTP Box -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="background-color:#EEF7FB; border:1px solid #DDEAF2; border-radius:8px; padding:18px;">
                        <span style="font-size:28px; font-weight:bold; letter-spacing:6px; color:#058FD2;">
                          ${otp}
                        </span>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:24px 0 0; font-size:12px; color:#888888; line-height:1.6;">
                    If you didn't request this code, you can safely ignore this email. Never share this OTP with anyone.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#F8FBFD; border-top:1px solid #DDEAF2; padding:16px 32px;">
                  <p style="margin:0; font-size:11px; color:#999999;">
                    This is an automated message.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    `,
  });
}