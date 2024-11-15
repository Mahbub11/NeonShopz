import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "@/components/NavBar/NavBar";
import { cn } from "@/lib/utils";
import { gistVF, gistmono } from "@/public/fonts";
import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import { Toaster, toast } from 'sonner'
import Footer from "@/container/homepage/footer";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn([gistVF.className,'antialiased'])}
        >
           <Toaster position="top-center" />
          <Navbar></Navbar>
          <div className="py-5 px-2">
          <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
          </div>

          <Footer></Footer>
        </body>
      </html>
    </SessionProvider>
  );
}

