import { connectDB } from "@/lib/db";


import Patient from "@/models/Patient";

export async function GET(req) {
  try {
    await connectDB();


    const { searchParams } = new URL(req.url);

    // PAGINATION
    const page = Number(searchParams.get("page")) || 1;

    const limit = Number(searchParams.get("limit")) || 10;

    // SEARCH
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // QUERY
    const query = {};

    // SEARCH BY PATIENT NAME
    if (search.trim()) {
      query.name = {
        $regex: search.trim(),
        $options: "i", // case insensitive
      };
    }

    const [patients, total] = await Promise.all([
      Patient.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Patient.countDocuments(query),
    ]);

    return Response.json(
      {
        success: true,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        count: patients.length,
        data: patients,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}