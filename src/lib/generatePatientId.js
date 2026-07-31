import Patient from "@/models/Patient";

export async function generatePatientId() {
  const latestPatient = await Patient.findOne({})
    .sort({ createdAt: -1 })
    .select("patientId");

  if (!latestPatient?.patientId) {
    return "PAT-000001";
  }

  const currentNumber = parseInt(
    latestPatient.patientId.replace("PAT-", ""),
    10
  );

  const nextNumber = currentNumber + 1;

  return `PAT-${String(nextNumber).padStart(6, "0")}`;
}