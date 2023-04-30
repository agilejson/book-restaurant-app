import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // * EXTRACT TOKEN FROM THE HEADER
    const bearerToken = req.headers["authorization"] as string;
    // get token
    const token = bearerToken.split(" ")[1];

    // * DECODE THE TOKEN

    const payload = jwt.decode(token) as { email: string };

    if (!payload.email) {
      return res.status(401).json({
        errorMessage: "Unauthorized Request",
      });
    }

    // * FETCH USER FROM DB

    interface UserType {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      city: string;
      phone: string;
    }

    const user: UserType | null = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        city: true,
        phone: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found!",
      });
    }

    // * SEND USER TO CLIENT

    return res.status(200).json({
      user,
    });
  }
  // * IF REQUEST TYPE IS NOT POST

  return res.status(404).json({
    errorMessage: "Unknown Request Type!",
  });
}

export default handler;
