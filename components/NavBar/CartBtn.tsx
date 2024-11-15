"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";


const CartBtn = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div onClick={openDrawer} className="cursor-pointer w-[20rem]">
      <div className="mt-2 ml-[-30px]">
        {" "}
        {/* <Cart isOpen={isDrawerOpen} onClose={closeDrawer}></Cart> */}
      </div>
    </div>
    // <Link href="/cart" className="relative mr-[14px] p-1">
    //   <Image
    //     priority
    //     src="/icons/cart.svg"
    //     height={100}
    //     width={100}
    //     alt="cart"
    //     className="max-w-[22px] max-h-[22px]"
    //   />

    // </Link>
  );
};

export default CartBtn;
