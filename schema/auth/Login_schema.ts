import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid Email Address",
  }),
  password: z.string().min(3, {
    message: "Password is Required",
  }),
  code: z.optional(z.string()),
});
