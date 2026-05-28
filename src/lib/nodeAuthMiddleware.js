import jwt from "jsonwebtoken";

function getAccessToken(req) {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return req.cookies?.accessToken;
}

export function requireNodeAuth(req) {
  const token = getAccessToken(req);

  if (!token) {
    return {
      error: {
        status: 401,
        body: {
          success: false,
          message: "Unauthorized access. Access token is required.",
        },
      },
    };
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("Please add ACCESS_TOKEN_SECRET inside .env.local");
  }

  try {
    return {
      user: jwt.verify(token, process.env.ACCESS_TOKEN_SECRET),
    };
  } catch {
    return {
      error: {
        status: 401,
        body: {
          success: false,
          message: "Unauthorized access. Invalid or expired token.",
        },
      },
    };
  }
}
