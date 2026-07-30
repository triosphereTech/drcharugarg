import fs from "fs/promises";
import path from "path";

import React from "react";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },

  heading: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },

  section: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 4,
  },

  value: {
    fontSize: 11,
  },
});

function PrescriptionDocument({
  appointment,
  prescriptionData,
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>
          Prescription
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>
            Patient Name
          </Text>
          <Text style={styles.value}>
            {appointment?.patient?.name || ""}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Service
          </Text>
          <Text style={styles.value}>
            {appointment?.service}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Primary Concern
          </Text>
          <Text style={styles.value}>
            {prescriptionData.primaryConcern}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Clinical Findings
          </Text>
          <Text style={styles.value}>
            {prescriptionData.clinicalFindings}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Diagnosis
          </Text>
          <Text style={styles.value}>
            {prescriptionData.diagnosis}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Treatment Plan
          </Text>
          <Text style={styles.value}>
            {prescriptionData.treatmentPlan}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Medications
          </Text>
          <Text style={styles.value}>
            {prescriptionData.medications}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Instructions
          </Text>
          <Text style={styles.value}>
            {prescriptionData.instructions}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Follow Up
          </Text>
          <Text style={styles.value}>
            {prescriptionData.followUpDays} Days
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Additional Notes
          </Text>
          <Text style={styles.value}>
            {prescriptionData.notes}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generatePrescriptionPdf(
  appointment,
  prescriptionData
) {
  const uploadDir = path.join(
    process.cwd(),
    "public/uploads/appointments"
  );

  await fs.mkdir(uploadDir, {
    recursive: true,
  });

  const fileName =
    `prescription-${appointment._id}-${Date.now()}.pdf`;

  const filePath = path.join(
    uploadDir,
    fileName
  );

  const pdfBlob = await pdf(
    <PrescriptionDocument
      appointment={appointment}
      prescriptionData={prescriptionData}
    />
  ).toBuffer();

  await fs.writeFile(
    filePath,
    pdfBlob
  );

  return `/uploads/appointments/${fileName}`;
}