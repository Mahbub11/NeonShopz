import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth"
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import prisma from "./lib/prisma";



import { LoginSchema } from "./schema/auth/Login_schema";
import { getUserByEmail } from "@/data/user";

// export default {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     Github({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);

//         if (validatedFields.success) {
//           const { email, password } = validatedFields.data;
          
//           const user = await getUserByEmail(email);
//           if (!user || !user.password) return null;

//           const passwordsMatch = await bcrypt.compare(
//             password,
//             user.password,
//           );

//           if (passwordsMatch) return user;
//         }

//         return null;
//       }
//     })
//   ],
// } satisfies NextAuthConfig

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      return true;
    },
    async session({ token, session }) {

       console.log("Session Callback: User Role", token.role); // Log the user role
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole; // Make sure this line executes
      }
    
     
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
    
      const existingUser = await getUserById(token.sub);
    
      if (!existingUser) return token;
    
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role; // Ensure this line is executed
    
      console.log("JWT Callback: User Role", existingUser.role); // Log the user role
      return token;
    }
  },
  


} satisfies NextAuthConfig;


// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
//   update,
// } = NextAuth({
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/error",
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       // Allow OAuth without email verification
//       if (account?.provider !== "credentials") return true;

//       const existingUser = await getUserById(user.id);

//       return true;
//     },
//     async session({ token, session }) {

//        console.log("Session Callback: User Role", token.role); // Log the user role
//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//       }
//       if (token.role && session.user) {
//         session.user.role = token.role as UserRole; // Make sure this line executes
//       }
    
     
//       return session;
//     },
//     async jwt({ token }) {
//       if (!token.sub) return token;
    
//       const existingUser = await getUserById(token.sub);
    
//       if (!existingUser) return token;
    
//       token.name = existingUser.name;
//       token.email = existingUser.email;
//       token.role = existingUser.role; // Ensure this line is executed
    
//       console.log("JWT Callback: User Role", existingUser.role); // Log the user role
//       return token;
//     }
//   },
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   ...authConfig,
// });
