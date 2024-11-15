'use client'
import Image from "next/image";
import { useSession } from "next-auth/react";

export default async function Home() {
const session= useSession()


console.log(session)
  return (
    <div >

    Test page
      
    </div>
  );
}
