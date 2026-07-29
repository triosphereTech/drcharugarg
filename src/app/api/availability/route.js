import { getAvailabilityForDate, getAvailabilityRange } from "@/lib/availability";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (date) {
      const payload = await getAvailabilityForDate(date);
      return Response.json(payload);
    }

    if (startDate && endDate) {
      const payload = await getAvailabilityRange(startDate, endDate);
      return Response.json(payload);
    }

    return Response.json(
      {
        success: false,
        message: "date or startDate/endDate query parameters are required.",
      },
      { status: 400 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message || "Could not load availability.",
      },
      { status: 500 }
    );
  }
}
