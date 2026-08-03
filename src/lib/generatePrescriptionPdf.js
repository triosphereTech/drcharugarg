import fs from "fs/promises";
import path from "path";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Svg,
  Circle,
  Path,
  StyleSheet,
  Link,
  pdf,
} from "@react-pdf/renderer";

const HEADER_LOGO_PATH = path.join(
  process.cwd(),
  "public/images/brand/Logo.png"
);
const SIGN_LOGO_PATH = path.join(
  process.cwd(),
  "public/images/brand/Sign.png"
);

const DEFAULT_CLINIC = {
  phone: "+91 84604 07471",
  email: "teleconsult.drcharugarg@gmail.com",
  website: "drcharugarg.com",
};

const TEAL = "#0d6d78";
const TEAL_DARK = "#0a4f57";
const INK = "#16233a";
const MUTED = "#5c6b7a";
const LINE = "#c9d3d8";

const styles = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
    fontSize: 11,
    color: INK,
  },
  card: {
    margin: 14,
    border: `1px solid ${LINE}`,
    borderRadius: 6,
    minHeight: 812,
    flexDirection: "column",
  },

  // ---------- HEADER ----------
  headerRow: {
    flexDirection: "row",
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 14,
  },
  logoBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1.15,
  },
  logoImage: {
    width: 78,
    height: 78,
    objectFit: "contain",
    marginRight: 12,
  },
  doctorInfo: {
    justifyContent: "flex-start",
  },
  doctorName: {
    fontSize: 21,
    fontFamily: "Times-Bold",
    color: "#111827",
    marginBottom: 3,
  },
  doctorQualification: {
    fontSize: 10.5,
    color: "#374151",
    marginBottom: 6,
  },
  tagline: {
    fontSize: 9.5,
    color: TEAL,
    fontWeight: 700,
    marginBottom: 4,
  },
  taglineDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    width: 150,
  },
  taglineDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: LINE,
  },
  taglineDividerDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: TEAL,
    marginHorizontal: 4,
  },
  specialties: {
    fontSize: 9.5,
    color: "#1f2937",
  },

  vDivider: {
    width: 1,
    backgroundColor: LINE,
    marginHorizontal: 18,
  },

  contactBlock: {
    flex: 1,
    justifyContent: "center",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },
  contactIconWrap: {
    marginRight: 9,
  },
  contactText: {
    fontSize: 10,
    color: "#1f2937",
  },

  headerBottomLine: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    marginBottom: 18,
  },
  headerBottomLineTrack: {
    flex: 1,
    height: 1.4,
    backgroundColor: TEAL,
  },
  headerBottomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: TEAL_DARK,
    marginLeft: -1,
  },

  // ---------- BODY ----------
  body: {
    paddingHorizontal: 26,
    flex: 1,
  },

fieldRowTwo: {
  flexDirection: "row",
  marginBottom: 12,
},

fieldRow: {
  flexDirection: "row",
  marginBottom: 10,
},
  fieldLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginRight: 6,
    lineHeight: 1.3,
  },
  fieldLabelFixed: {
    width: 108,
  },
fieldLine: {
  flex: 1,
  minHeight: 14,
  justifyContent: "center",
},
  fieldValue: {
    fontSize: 10.5,
    color: "#111827",
    lineHeight: 1.3,
  },

blockRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 14,
},

sectionDivider: {
  borderBottomWidth: 1,
  borderBottomColor: LINE,
  marginBottom: 16,
},

blockLabel: {
  width: 108,              // Fixed width for alignment (wide enough for bold "Diagnosis :")
  marginRight: 6,
  fontSize: 11,
  fontFamily: "Helvetica-Bold",
  color: "#111827",
  lineHeight: 1.5,
},

blockContent: {
  flex: 1,
},

blockValue: {
  fontSize: 10.5,
  color: "#111827",
  lineHeight: 1.5,
},

  rxBlock: {
    marginBottom: 6,
    flexGrow: 1,
    alignItems: "flex-start",
  },
  rxLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 8,
  },
rxLine: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 8,
},

rxBullet: {
  width: 18,          // little wider than before
  fontSize: 15,
  color: TEAL_DARK,
  textAlign: "center",
  lineHeight: 1.5,    // same as text
  marginRight: 6,
},

rxText: {
  flex: 1,
  fontSize: 10.5,
  color: "#111827",
  lineHeight: 1.5,
},
  // ---------- FOLLOW UP + SIGNATURE ----------
  bottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: "auto",
    paddingTop: 10,
    marginBottom: 22,
  },
  followUpCol: {
    flex: 1,
    paddingRight: 20,
  },
  followUpLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 6,
  },
followUpLine: {
  minHeight: 14,
  paddingBottom: 2,
},
  followUpValue: {
    fontSize: 10.5,
    color: "#111827",
  },

  signatureCol: {
    width: 190,
    alignItems: "center",
  },
  signatureImage: {
    width: 120,
    height: 46,
    objectFit: "contain",
    marginBottom: 2,
  },
  signatureLine: {
    width: 105,
    borderTopWidth: 1,
    borderTopColor: "#374151",
    marginBottom: 5,
  },
  signatureName: {
    fontSize: 12.5,
    fontFamily: "Times-Bold",
    color: "#111827",
    marginBottom: 2,
  },
  signatureQualification: {
    fontSize: 9.5,
    color: "#374151",
    marginBottom: 1,
  },
  signatureRole: {
    fontSize: 9,
    color: MUTED,
    marginBottom: 3,
  },
  signatureReg: {
    fontSize: 9,
    color: "#111827",
  },
  signatureRegValue: {
    color: TEAL_DARK,
    fontWeight: 700,
  },

  // ---------- FOOTER ----------
  footerWrap: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 16,
  },
  footerTopLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  footerTopLineTrack: {
    flex: 1,
    height: 1,
    backgroundColor: TEAL,
  },
  footerTopDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: TEAL_DARK,
    position: "absolute",
    left: "50%",
    marginLeft: -2.5,
  },
  disclaimerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 12,
  },
  disclaimerIconWrap: {
    marginRight: 8,
    marginTop: 1,
  },
  disclaimerTextWrap: {},
  disclaimerText: {
    fontSize: 8.5,
    color: "#374151",
    lineHeight: 1.4,
  },
  websiteRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  websiteDash: {
    width: 34,
    height: 1,
    backgroundColor: TEAL,
    marginHorizontal: 10,
  },
  websiteText: {
    fontSize: 10,
    color: TEAL_DARK,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
});

// ---------- ICONS (drawn as inline SVG so no external font/asset needed) ----------

function IconCircle({ children }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="11" stroke={TEAL} strokeWidth={1.3} fill="none" />
      {children}
    </Svg>
  );
}

function PhoneIcon() {
  return (
    <IconCircle>
      <Path
        d="M8.2 7.3c-.3-.7.1-1.5.8-1.7l1-.3c.6-.2 1.3.1 1.5.7l.6 1.5c.2.5 0 1-.4 1.4l-.7.6c.5 1.4 1.6 2.5 3 3l.6-.7c.3-.4.9-.6 1.4-.4l1.5.6c.6.2.9.9.7 1.5l-.3 1c-.2.7-1 1.1-1.7.8-4.2-1.5-7.5-4.8-9-9z"
        fill={TEAL}
      />
    </IconCircle>
  );
}

function MailIcon() {
  return (
    <IconCircle>
      <Path
        d="M6.2 8.4c0-.5.4-.9.9-.9h9.8c.5 0 .9.4.9.9v7.2c0 .5-.4.9-.9.9H7.1c-.5 0-.9-.4-.9-.9V8.4z"
        stroke={TEAL}
        strokeWidth={1.1}
        fill="none"
      />
      <Path
        d="M6.5 8.6l5.5 4.3 5.5-4.3"
        stroke={TEAL}
        strokeWidth={1.1}
        fill="none"
      />
    </IconCircle>
  );
}

function GlobeIcon() {
  return (
    <IconCircle>
      <Circle cx="12" cy="12" r="5.4" stroke={TEAL} strokeWidth={1.1} fill="none" />
      <Path d="M12 6.6c-2.2 2.9-2.2 8 0 10.8" stroke={TEAL} strokeWidth={1} fill="none" />
      <Path d="M12 6.6c2.2 2.9 2.2 8 0 10.8" stroke={TEAL} strokeWidth={1} fill="none" />
      <Path d="M6.6 12h10.8" stroke={TEAL} strokeWidth={1} fill="none" />
    </IconCircle>
  );
}

function InfoIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10.5" stroke={TEAL} strokeWidth={1.4} fill="none" />
      <Circle cx="12" cy="7.6" r="1.15" fill={TEAL} />
      <Path
        d="M12 11v6.4"
        stroke={TEAL}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ---------- HEADER ----------

function PdfHeader({ doctor, clinic }) {
  return (
    <>
      <View style={styles.headerRow}>
        <View style={styles.logoBlock}>
          <Image src={HEADER_LOGO_PATH} style={styles.logoImage} />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor?.name || "Dr. Charu Garg"}</Text>
            <Text style={styles.doctorQualification}>
              {doctor?.qualification || "MD Dermatology"}
            </Text>
            <Text style={styles.tagline}>
              {doctor?.tagline || "Evidence-based Dermatology Care"}
            </Text>
            <View style={styles.taglineDivider}>
              <View style={styles.taglineDividerLine} />
              <View style={styles.taglineDividerDot} />
              <View style={styles.taglineDividerLine} />
            </View>
            <Text style={styles.specialties}>
              {doctor?.specialties || "Skin  |  Hair  |  Nail disorders"}
            </Text>
          </View>
        </View>

        <View style={styles.vDivider} />

        <View style={styles.contactBlock}>
          {clinic?.phone ? (
            <View style={styles.contactRow}>
              <View style={styles.contactIconWrap}>
                <PhoneIcon />
              </View>
              <Text style={styles.contactText}>{clinic.phone}</Text>
            </View>
          ) : null}
          {clinic?.email ? (
            <View style={styles.contactRow}>
              <View style={styles.contactIconWrap}>
                <MailIcon />
              </View>
              <Text style={styles.contactText}>{clinic.email}</Text>
            </View>
          ) : null}
          {clinic?.website ? (
            <View style={[styles.contactRow, { marginBottom: 0 }]}>
              <View style={styles.contactIconWrap}>
                <GlobeIcon />
              </View>
              <Text style={styles.contactText}>{clinic.website}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.headerBottomLine}>
        <View style={styles.headerBottomLineTrack} />
        <View style={styles.headerBottomDot} />
      </View>
    </>
  );
}

// ---------- FOOTER ----------

function PdfFooter({ website, disclaimer }) {
  return (
    <View style={styles.footerWrap}>
      <View style={styles.footerTopLine}>
        <View style={styles.footerTopLineTrack} />
      </View>

      <View style={styles.disclaimerRow}>
        <View style={styles.disclaimerIconWrap}>
          <InfoIcon />
        </View>
        <View style={styles.disclaimerTextWrap}>
          <Text style={styles.disclaimerText}>
            {disclaimer ||
              "This prescription is generated after an online medical consultation.\nPlease follow the prescribed treatment as advised."}
          </Text>
        </View>
      </View>

      <View style={styles.websiteRow}>
        <View style={styles.websiteDash} />
        <GlobeIcon />
        <Link
  src={`https://${website || "www.drcharugarg.com"}`}
  style={[styles.websiteText, { marginLeft: 8, textDecoration: "none" }]}
>
  {website || "www.drcharugarg.com"}
</Link>
        <View style={styles.websiteDash} />
      </View>
    </View>
  );
}

// ---------- FIELD HELPERS ----------

function InlineField({ label, value, style, align }) {
  const isRight = align === "right";
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: isRight ? "flex-end" : "flex-start",
        },
        style,
      ]}
    >
      <Text style={[styles.fieldLabel, !isRight && styles.fieldLabelFixed]}>
        {label} :
      </Text>
      <View
        style={
          isRight
            ? { justifyContent: "center" }
            : styles.fieldLine
        }
      >
        {value ? <Text style={styles.fieldValue}>{value}</Text> : null}
      </View>
    </View>
  );
}

function BlockField({ label, value }) {
  return (
    <View style={styles.blockRow}>
      <Text style={styles.blockLabel}>{label} :</Text>

      <View style={styles.blockContent}>
        {value ? (
          <Text style={styles.blockValue}>{value}</Text>
        ) : null}
      </View>
    </View>
  );
}

function RxField({ label, items }) {
  const lines = Array.isArray(items)
    ? items.filter(Boolean)
    : (items || "")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

  // Always render at least a couple of blank ruled lines so the pad looks
  // consistent even before any medicines are added.
  const rows = lines.length > 0 ? lines : ["", ""];

  return (
    <View style={[styles.blockRow, styles.rxBlock]}>
      <Text style={styles.blockLabel}>{label} :</Text>
      <View style={styles.blockContent}>
        {rows.map((line, i) => (
          <View style={styles.rxLine} key={i}>
            <Text style={styles.rxBullet}>
              {line ? "•" : ""}
            </Text>
            <Text style={styles.rxText}>{line}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ---------- MAIN DOCUMENT ----------

function PrescriptionDocument({ appointment, prescriptionData, doctor = {}, clinic = {} }) {
  const mergedClinic = { ...DEFAULT_CLINIC, ...clinic };
  const patientName = appointment?.patient?.name || "";
  const dob = appointment?.patient?.dob;
  const age = dob
    ? Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : appointment?.patient?.age;
  const gender = appointment?.patient?.gender;
  const ageSex = [age ? `${age} yrs` : null, gender].filter(Boolean).join(" / ");

  const dateStr = appointment?.date
    ? new Date(appointment.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.card}>
          <PdfHeader doctor={doctor} clinic={mergedClinic} />

          <View style={styles.body}>
            <View style={styles.fieldRowTwo}>
              <InlineField label="Name" value={patientName} style={{ flex: 1.6, marginRight: 24 }} />
              <InlineField label="Date" value={dateStr} style={{ flex: 1 }} align="right" />
            </View>

            <InlineField label="Age / Sex" value={ageSex} style={styles.fieldRow} />
            <InlineField
              label="Reg. ID"
              value={appointment?.patient?.patientId}
              style={styles.fieldRow}
            />

            <View style={styles.sectionDivider} />

            <BlockField label="History" value={prescriptionData?.primaryConcern} />
            <BlockField label="Inv." value={prescriptionData?.clinicalFindings} />
            <BlockField label="Diagnosis" value={prescriptionData?.diagnosis} />

            <RxField label="Rx" items={prescriptionData?.treatmentPlan} />

            <View style={styles.bottomRow}>
              <View style={styles.followUpCol}>
                <Text style={styles.followUpLabel}>Follow up advice :</Text>
                <View style={styles.followUpLine}>
                  {prescriptionData?.notes ? (
                    <Text style={styles.followUpValue}>{prescriptionData.notes}</Text>
                  ) : null}
                </View>
              </View>

              <View style={styles.signatureCol}>
                <Image src={SIGN_LOGO_PATH} style={styles.signatureImage} />
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{doctor?.name || "Dr. Charu Garg"}</Text>
                <Text style={styles.signatureQualification}>
                  {doctor?.qualification || "MD Dermatology"}
                </Text>
                <Text style={styles.signatureRole}>
                  {doctor?.role || "Consultant Dermatologist"}
                </Text>
                <Text style={styles.signatureReg}>
                  Reg. No.: <Text style={styles.signatureRegValue}>{doctor?.regNo || "G-39685"}</Text>
                </Text>
              </View>
            </View>
          </View>

          <PdfFooter website={mergedClinic.website} disclaimer={mergedClinic.disclaimer} />
        </View>
      </Page>
    </Document>
  );
}

export async function generatePrescriptionPdf(
  appointment,
  prescriptionData,
  doctor = {},
  clinic = {}
) {
  const uploadDir = path.join(process.cwd(), "public/uploads/appointments");
  await fs.mkdir(uploadDir, { recursive: true });


  const indiaDate = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})
  .format(new Date())
  .replace(/\//g, "-");

const fileName = `Prescription-${
  appointment.patient.patientId || appointment._id
}-${indiaDate}.pdf`;
  const filePath = path.join(uploadDir, fileName);

  const pdfBlob = await pdf(
    <PrescriptionDocument
      appointment={appointment}
      prescriptionData={prescriptionData}
      doctor={doctor}
      clinic={clinic}
    />
  ).toBuffer();

  await fs.writeFile(filePath, pdfBlob);

  return `/uploads/appointments/${fileName}`;
}