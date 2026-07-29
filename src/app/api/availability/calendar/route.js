import { getCalendarAvailability } from "@/lib/availability";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = Number(searchParams.get("year"));
    const month = Number(searchParams.get("month"));
    const payload = await getCalendarAvailability(year, month);
    return Response.json(payload);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message || "Could not load calendar availability." },
      { status: 400 }
    );
  }
}
