"use server";
import { actionClient } from "@/lib/safe-action";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { LoginSchema } from "@/schema/auth/Login_schema";
import prisma from "@/lib/prisma";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (existingUser?.email !== email) {
        return { error: "Email Not Found" };

      }

      await signIn("credentials", {
        email,
        password,
        redirectTo:  DEFAULT_LOGIN_REDIRECT,
      })

    
      return { success: "User Signed In!" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email or Password Incorrect" };
          case "OAuthSignInError":
            return { error: error.message };
          default:
            return { error: "Something went wrong" };
        }
      }
      return {error: 'Something went wrong'};
    }
  });
