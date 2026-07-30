import fs from "fs/promises";
import path from "path";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

const HEADER_LOGO_PATH = path.join(
  process.cwd(),
  "public/images/brand/LogoTop.png"
);
const WATERMARK_LOGO_PATH = path.join(
  process.cwd(),
  "public/images/brand/WebsiteFooterLogo.png"
);
const SIGN_LOGO_PATH = path.join(
  process.cwd(),
  "public/images/brand/Sign.png"
);

const COLORS = {
  primary: "#1e4d8c",
  primaryDark: "#0b3766",
  text: "#1f2937",
  muted: "#6b7280",
  border: "#e2e6ea",
  faint: "#f4f6f8",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 95,
    paddingBottom: 70,
    paddingHorizontal: 30,
    fontSize: 11,
    color: COLORS.text,
  },

  // ---------- HEADER ----------
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 78,
    paddingHorizontal: 30,
    paddingTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLogo: {
    width: 110,
    objectFit: "contain",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  doctorName: {
    fontSize: 15,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 2,
  },
  doctorDesignation: {
    fontSize: 9.5,
    color: COLORS.muted,
    marginBottom: 1,
  },
  doctorMeta: {
    fontSize: 8,
    color: COLORS.muted,
  },

  // ---------- WATERMARK ----------
  watermarkWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  watermarkImage: {
    width: 280,
    opacity: 0.05,
  },

  // ---------- FOOTER ----------
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    paddingVertical: 11,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerCol: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  footerDivider: {
    width: 1,
    height: 14,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  footerValue: {
    fontSize: 9.5,
    color: "#ffffff",
    fontWeight: 700,
  },

  // ---------- PATIENT META STRIP ----------
  metaStrip: {
    flexDirection: "row",
    backgroundColor: COLORS.faint,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 7.5,
    color: COLORS.muted,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 10.5,
    fontWeight: 700,
    color: COLORS.text,
  },

  // ---------- SECTION BLOCKS ----------
  section: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 9.5,
    fontWeight: 700,
    color: COLORS.primary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 3,
  },
  sectionValue: {
    fontSize: 10.5,
    lineHeight: 1.4,
    color: COLORS.text,
  },

  // ---------- RX / MEDICATIONS (compact, wrapping flow) ----------
  rxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rxSymbol: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.primary,
    marginRight: 6,
  },
  rxLabel: {
    fontSize: 9.5,
    fontWeight: 700,
    color: COLORS.primary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  medFlow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  medChip: {
    fontSize: 10.5,
    color: COLORS.text,
    marginRight: 14,
    marginBottom: 3,
  },
  medIndex: {
    fontWeight: 700,
    color: COLORS.primary,
  },

  // ---------- FOLLOW UP BADGE ----------
  followUpBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#e8f0fb",
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 2,
  },
  followUpText: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.primaryDark,
  },

  // ---------- SIGNATURE ----------
  signatureBlock: {
    marginTop: 26,
    alignItems: "flex-end",
  },
  signatureImage: {
    width: 110,
    height: 45,
    objectFit: "contain",
    marginBottom: -6,
  },
  signatureLine: {
    width: 160,
    borderTopWidth: 1,
    borderTopColor: COLORS.text,
    paddingTop: 6,
    alignItems: "center",
  },
  signatureName: {
    fontSize: 10.5,
    fontWeight: 700,
    color: COLORS.text,
  },
  signatureRole: {
    fontSize: 8.5,
    color: COLORS.muted,
  },
});

// ---------- FIXED HEADER / FOOTER / WATERMARK ----------

function PdfHeader({ doctorName, designation, regNo }) {
  return (
    <View style={styles.header} fixed>
      <Image src={HEADER_LOGO_PATH} style={styles.headerLogo} />
      <View style={styles.headerRight}>
        <Text style={styles.doctorName}>{doctorName}</Text>
        {designation ? (
          <Text style={styles.doctorDesignation}>{designation}</Text>
        ) : null}
        {regNo ? <Text style={styles.doctorMeta}>{regNo}</Text> : null}
      </View>
    </View>
  );
}

function FooterCol({ value, last }) {
  if (!value) return null;
  return (
    <>
      <View style={styles.footerCol}>
        <Text style={styles.footerValue}>{value}</Text>
      </View>
      {!last && <View style={styles.footerDivider} />}
    </>
  );
}

function PdfFooter({ phone, email, website }) {
  return (
    <View style={styles.footer} fixed>
      <FooterCol value={phone} />
      <FooterCol value={email} />
      <FooterCol value={website} last />
    </View>
  );
}

function PdfWatermark() {
  return (
    <View style={styles.watermarkWrap} fixed>
      <Image src={WATERMARK_LOGO_PATH} style={styles.watermarkImage} />
    </View>
  );
}

// ---------- CONTENT HELPERS ----------

function Section({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <Text style={styles.sectionValue}>{value}</Text>
    </View>
  );
}

// Compact wrapping flow instead of one-per-line rows — saves vertical space
function MedicationList({ raw }) {
  if (!raw) return null;
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  return (
    <View style={styles.section}>
      <View style={styles.rxRow}>
        <Text style={styles.rxSymbol}>℞</Text>
        <Text style={styles.rxLabel}>Medications</Text>
      </View>
      <View style={styles.medFlow}>
        {lines.map((line, i) => (
          <Text style={styles.medChip} key={i}>
            <Text style={styles.medIndex}>{i + 1}. </Text>
            {line}
          </Text>
        ))}
      </View>
    </View>
  );
}

function formatDate(date) {
  const d = date ? new Date(date) : new Date();
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ---------- MAIN DOCUMENT ----------

function PrescriptionDocument({ appointment, prescriptionData, doctor, clinic }) {
  const patientName = appointment?.patient?.name || "-";
  const age = appointment?.patient?.age;
  const gender = appointment?.patient?.gender;
  const ageGender = [age ? `${age} yrs` : null, gender].filter(Boolean).join(" / ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfWatermark />

        <PdfHeader
          doctorName={doctor?.name || "Dr. Charu Garg"}
          designation={doctor?.designation || "MD Dermatologist"}
          regNo={doctor?.regNo}
        />

        {/* Patient / date meta strip */}
        <View style={styles.metaStrip}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Patient</Text>
            <Text style={styles.metaValue}>{patientName}</Text>
          </View>
          {ageGender ? (
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Age / Gender</Text>
              <Text style={styles.metaValue}>{ageGender}</Text>
            </View>
          ) : null}
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Service</Text>
            <Text style={styles.metaValue}>{appointment?.service || "-"}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{formatDate(appointment?.date)}</Text>
          </View>
        </View>

        <Section label="Primary Concern" value={prescriptionData?.primaryConcern} />
        <Section label="Clinical Findings" value={prescriptionData?.clinicalFindings} />
        <Section label="Diagnosis" value={prescriptionData?.diagnosis} />
        <Section label="Treatment Plan" value={prescriptionData?.treatmentPlan} />

        <MedicationList raw={prescriptionData?.medications} />

        <Section label="Instructions" value={prescriptionData?.instructions} />

        {prescriptionData?.followUpDays ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Follow Up</Text>
            <View style={styles.followUpBadge}>
              <Text style={styles.followUpText}>
                Review after {prescriptionData.followUpDays} days
              </Text>
            </View>
          </View>
        ) : null}

        <Section label="Additional Notes" value={prescriptionData?.notes} />

        {/* Signature */}
        <View style={styles.signatureBlock}>
          <Image src={SIGN_LOGO_PATH} style={styles.signatureImage} />
          <View style={styles.signatureLine}>
            <Text style={styles.signatureName}>
              {doctor?.name || "Dr. Charu Garg"}
            </Text>
            <Text style={styles.signatureRole}>
              {doctor?.designation || "MD Dermatologist"}
            </Text>
          </View>
        </View>

        <PdfFooter
          phone={clinic?.phone || "+91 98765 43210"}
          email={clinic?.email || "care@drcharugarg.com"}
          website={clinic?.website || "www.drcharugarg.com"}
        />
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

  const fileName = `prescription-${appointment._id}-${Date.now()}.pdf`;
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