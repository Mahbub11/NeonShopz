"use client";
import { FC, useState } from "react";
import useCartStore from "@/store/cart-slice";
import CartItemComponent from "./cart-item";
import { Drawer, DrawerContent } from "../ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer() {
  const { cart, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const [openSheet, setOpenSheet] = useState(false);
  const { data: user } = useSession();

  const handleConfirmOrder = async () => {
    const data = {
      userId: user?.user.id, // Ensure this is a string if your API expects a string
      items: cart, // Ensure cart is in the correct format
    };

    try {
      const res = await axiosInstance.post("/order", data); // Directly send data without wrapping in an object
      toast("Cart Data Added!");
      console.log(res.data); // Log the response data
    } catch (err) {
      toast("Cart not Added");
      console.error(err); // Log the error for debugging
    }

    console.log(cart); // Log the cart data
  };

  const handlePayment = async () => {
    const data = {
      userId: user?.user.id, // Ensure this is a string if your API expects a string
      items: cart, // Ensure cart is in the correct format
    };

    try {
      const res = await axiosInstance.post("/payment", data); // Directly send data without wrapping in an object
      toast("Order Confirmed");
      console.log(res.data); // Log the response data
    } catch (err) {
      toast("Failed!");
      console.error(err); // Log the error for debugging
    }
  };
  return (
    <div className="font-ppl">
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger>
          <Image
            priority
            src="/icons/cart.svg"
            height={100}
            width={100}
            alt="cart"
            className="max-w-[22px] max-h-[22px]"
          />
        </SheetTrigger>
        <SheetContent className="w-[28rem]">
          <div className="p-1 bg-white">
            <h2 className="text-[20px] font-[500]">Your Shopping Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4 overflow-y-visible">
                  {cart.map((item) => (
                    <CartItemComponent key={item.id} {...item} />
                  ))}
                </div>
                <div>
                  <div className="flex justify-between mt-10">
                    <span className="text-[20px]">Subtotal:</span>
                    <span className="text-[23px] font-[500]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

               

               <div className="mt-10">
               <Link href={"https://buy.stripe.com/test_28o2ahgqI1l5024cMM"} className=" overflow-hidden group mt-5">
                  <button
                    // onClick={handleConfirmOrder}
                    className="bg-black/90 w-full relative px-5 py-3 font-[400]
                   overflow-hidden group border-black border-[1.8px]"
                  >
                    <span
                      className="group-hover:text-black font-gvf font-[700] 
                 relative z-10 text-white uppercase tracking-widest"
                    >
                      Checkout
                    </span>
                    {/* Pseudo-element for filling effect */}
                    <span
                      className="absolute inset-0 bg-white group-hover:w-full 
                    transition-all duration-500 w-0"
                    ></span>
                  </button>
                </Link>
               </div>

                <div className=" overflow-hidden group mt-5">
                  <button
                    onClick={clearCart}
                    className="bg-black/90 w-full relative px-5 py-3 font-[400]
                   overflow-hidden group border-black border-[1.8px]"
                  >
                    <span
                      className="group-hover:text-black font-gvf font-[700] 
                 relative z-10 text-white uppercase tracking-widest"
                    >
                     Clear All
                    </span>
                    {/* Pseudo-element for filling effect */}
                    <span
                      className="absolute inset-0 bg-white group-hover:w-full 
                    transition-all duration-500 w-0"
                    ></span>
                  </button>
                </div>

                {/* <button
                  onClick={handlePayment}
                  className="mt-4 w-full bg-green-300 text-white
                 py-2 rounded hover:bg-red-500 transition"
                >
                  Payment
                </button> */}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>

    // <Drawer direction="right" open={isOpen} onOpenChange={onClose}>
    //   <DrawerContent className=" h-full w-[40%]">
    //     <div className="p-4 border rounded-lg shadow-md bg-white">
    //       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
    //       {cart.length === 0 ? (
    //         <p className="text-gray-500">Your cart is empty.</p>
    //       ) : (
    //         <>
    //           <div className="space-y-4">
    //             {cart.map((item) => (
    //               <CartItemComponent key={item.id} {...item} />
    //             ))}
    //           </div>
    //           <div className="flex justify-between mt-4">
    //             <span className="text-lg font-bold">Subtotal:</span>
    //             <span className="text-lg">${subtotal.toFixed(2)}</span>
    //           </div>
    //           <button
    //             onClick={clearCart}
    //             className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
    //           >
    //             Clear Cart
    //           </button>
    //         </>
    //       )}
    //     </div>
    //   </DrawerContent>
    // </Drawer>
  );
}
