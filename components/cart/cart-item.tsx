// src/components/CartItemComponent.tsx
import { FC } from "react";
import { CartItem } from "@/types/cart/cart-type"; // Assuming you have CartItem interface defined
import useCartStore from "@/store/cart-slice";
import Image from "next/image";
import { featureOne } from "@/public";
import { Cross, MinusIcon, PlusIcon, X } from "lucide-react";

interface CartItemProps extends CartItem {}

const CartItemComponent: FC<CartItemProps> = ({
  id,
  title,
  price,
  quantity,
  variantId,
  stockId,
  size,
  color,
}) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

  return (
    <div
      className="flex items-center  mt-10
       space-x-8"
      >
      <div>
        <Image
          src={featureOne}
          alt="fff"
          className="h-[10rem] w-[8rem] object-cover"
          height="100"
          width="200"
        ></Image>
      </div>
      <div className="flex-1">
        <div className="flex-col space-y-3">
          <h3 className="text-[15px]">{title}</h3>

          <div className="flex space-x-2 items-center ">
            <p className="text-black font-gvf font-[600] mt-1">
              ${price.toFixed(2)} x {quantity} {size && `(${size})`}
            </p>
            <div
              className="h-4 w-4 rounded-full mt-1"
              style={{ backgroundColor: color }} // Use inline style for hex color
            ></div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full ">
          <div className="flex justify-between space-x-5 mt-2 border-[1.8px] w-[8rem] py-4 px-5">
            <button
              onClick={() => decreaseQuantity(id, variantId, stockId)}
              className="font-[800]"
            >
              <MinusIcon size={15} />
            </button>
            <span>{quantity}</span>
            <button onClick={() => increaseQuantity(id, variantId, stockId)}>
              <PlusIcon size={15} />
            </button>
          </div>

          <button
            className="w-full flex justify-end"
            onClick={() => removeFromCart(id, variantId, stockId)}
          >
            <span>
              <X size={25} strokeWidth="2px"></X>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
