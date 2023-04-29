import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // * VALIDATION OF DATA

    // this will contains all the error message for every field that might have some problem
    let errors: string[] = [];
    const { firstName, lastName, city, password, email, phone } = req.body;
    // array which holds the validation for the fields
    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Invalid Email!",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage:
          "Password should be at least 8 character long and should contain at least one lowercase, one uppercase, one number and one special character!",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Invalid Phone!",
      },
    ];
    // loop over `validationSchema` and check if any of files is false(not valid input) then push the respective error message to `errors`
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    // if there is any error then just return the first error message
    if (errors.length) {
      return res.status(400).json({
        errorMessage: errors[0],
      });
    }

    // * CHECK IF THE USER ALREADY EXISTS BY CHECKING IF EMAIL ALREADY EXITS
    const userWithEmail: User | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      return res.status(400).json({
        errorMessage: "Email is associated with anther account!",
      });
    }

    // * HASHING PASSWORD

    // 10 here will at 10 character to the left of hashed password and we call it adding salt
    const hashedPassword = await bcrypt.hash(password, 10);

    // * SAVE USER TO DATABASE

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        city,
        password: hashedPassword,
        email,
        phone,
      },
    });

    // * CREATE A JWT

    // passing email as payload a unique identifier
    // pass what type of algorithm we want to use in setProtectedHeader
    // pass some secret string to sign method to sign the token so that it shows that token is not modified, when to got JWT website to verify the token will will give use the payload(email here) but it will say that token in invalid but if we provide the secret to them then only they will say token is valid and not modified

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24hr")
      .sign(secret);

    // * SEND JWT TO USER

    res.status(200).json({
      token,
    });
  }

  // * IF REQUEST TYPE IS NOT POST

  return res.status(404).json({
    errorMessage: "Unknown Request Type!",
  });
}

export default handler;
