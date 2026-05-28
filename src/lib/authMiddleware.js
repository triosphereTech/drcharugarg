import jwt from "jsonwebtoken";

function getAccessToken(request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return request.cookies?.get("accessToken")?.value;
}

export function unauthorizedResponse(message = "Unauthorized access.") {
  return Response.json(
    {
      success: false,
      message,
    },
    { status: 401 }
  );
}

export function requireAuth(request) {
  const token = getAccessToken(request);

  if (!token) {
    return {
      error: unauthorizedResponse("Unauthorized access. Access token is required."),
    };
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("Please add ACCESS_TOKEN_SECRET inside .env.local");
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    return {
      user,
    };
  } catch {
    return {
      error: unauthorizedResponse("Unauthorized access. Invalid or expired token."),
    };
  }
}
