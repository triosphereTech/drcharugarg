import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function createAccessToken(patient) {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("Please add ACCESS_TOKEN_SECRET inside .env.local");
  }

  return jwt.sign(
    {
      id: patient._id.toString(),
      email: patient.email,
      mobileNumber: patient.mobileNumber,
      role: 'patient'
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
}
export async function requireAuth() {

  try {

    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;
   
    // TOKEN NOT FOUND
    if (!token) {
      return {
        success: false,
      };
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    return {
      success: true,
      user: decoded,
    };

  } catch (error) {
    return {
      success: false,
    };
  }
}

export function verifyAccessToken(token) {
   const decoded = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (decoded.role !== "patient") {
    throw new Error("Invalid patient token");
  }

  return decoded;
}