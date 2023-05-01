import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // * VALIDATE THE USER INPUT

    const { email, password } = req.body;

    let errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Invalid Email",
      },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "Invalid Password",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({
        errorMessage: errors[0],
      });
    }

    // * VALIDATE THAT USER HAS ACCOUNT WITH THE GIVEN EMAIL
    const user: User | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errorMessage: "Email or Password is Invalid!",
      });
    }

    // * COMPARE THE HASHED PASSWORD
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        errorMessage: "Email or Password is Invalid!",
      });
    }

    // * CREATE THE JWT

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24hr")
      .sign(secret);

    // this will set cookie on the client side
    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    // * SEND JWT TO USER

    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
  }

  // * IF REQUEST TYPE IS NOT POST

  return res.status(404).json({
    errorMessage: "Unknown Request Type!",
  });
}

export default handler;
