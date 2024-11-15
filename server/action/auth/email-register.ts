"use server";
import bcrpyt from "bcrypt";
import { RegisterSchema } from "@/schema/auth/Register_schema";
import { actionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";

export const emailRegister = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    // Hash the password
    const hashedPassword = await bcrpyt.hash(password, 10);

    console.log('d')
    // Check for an existing user
    const existingUser = await prisma.user.findFirst({
      where: { email: {
        equals: email,
      } },
    });

    if (existingUser) {
      return { error: "Email already in use" };
    }

    // Insert a new user if not already registered
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword, // Ensure this field matches your schema
        },
      });

      return { success: true, data: newUser };
    } catch (error) {
      console.error(error);
      return { error: 'User Register Failed' };
    }
  });
