import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Patient from "@/models/Patient";

export async function GET(request) {
  try {
    const auth = await requireAuth(request);
    if (!auth.success) {
      return Response.json(
        {
          success:false,
          message: "Patient hasn't logged in yet."
        }, 
        {status: 401}
      )
    }

    await connectDB();

    const patient = await Patient.findById(auth.user.id).select("-otp");
    if (!patient) {
      return Response.json(
        {
          success: false,
          message: "Patient not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      patient,
    });
  } catch (error) {
    console.log(error)
    return Response.json(
      {
        success: false,
        message: "Something went wrong while fetching patient profile.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


export async function PUT(request) {
  try {
    const auth = await requireAuth(request);

    if (!auth.success) {
      return Response.json(
        {
          success: false,
          message: "Patient hasn't logged in yet.",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    const {
      name,
      email,
      mobileNumber,
      dob,
      gender,
      bloodGroup,
      address,
    } = body;


    const updatedPatient = await Patient.findByIdAndUpdate(
      auth.user.id,
      {
        name,
        email,
        mobileNumber,
        dob,
        gender,
        bloodGroup,
        address,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-otp -otpExpiresAt");


    if (!updatedPatient) {
      return Response.json(
        {
          success: false,
          message: "Patient not found.",
        },
        { status: 404 }
      );
    }


    return Response.json({
      success: true,
      message: "Profile updated successfully.",
      patient: updatedPatient,
    });


  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong while updating profile.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}