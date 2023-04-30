import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization") as string;
  // if token doesn't exists
  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({
        errorMessage: "Unauthorized Request",
      }),
      {
        status: 401,
      }
    );
  }
  // get token
  const token = bearerToken.split(" ")[1];

  // * VERIFY TOKEN
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        errorMessage: "Unauthorized Request",
      }),
      {
        status: 401,
      }
    );
  }
}

// this middleware will be called on if we go to the given route
export const config = {
  matcher: ["/api/auth/me"],
};
