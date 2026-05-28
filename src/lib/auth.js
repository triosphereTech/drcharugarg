import jwt from "jsonwebtoken";

export function createAccessToken(patient) {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("Please add ACCESS_TOKEN_SECRET inside .env.local");
  }

  return jwt.sign(
    {
      id: patient._id.toString(),
      email: patient.email,
      mobileNumber: patient.mobileNumber,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
}
