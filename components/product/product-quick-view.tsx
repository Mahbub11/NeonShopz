import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ProductImageSlider from "./product-image-slider";
import ProductDetail from "./product-description";
import { useState } from "react";
import { X } from "lucide-react"; // Using lucide-react for the close icon
import { Product } from "@/types/prisma-data-types";

interface ProductModalProps {
  product: Product;
}

const ProductViewQuick: React.FC<ProductModalProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline">Quick View</Button>
        </DialogTrigger>
        <DialogContent
          style={{ borderRadius: 0 }}
          className="[&>button]:hidden w-full max-w-5xl px-10 py-10"
        >
          {/* Close Button */}
          <div>
            <Button
              style={{ borderRadius: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-[-1rem] right-[-1rem] p-2
               bg-black text-white
                hover:bg-gray-800 focus:outline-none"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-center w-full space-x-8">
            <div className="flex-1 h-auto p-4">
              <div className="p-4">
                <ProductDetail product={product} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductViewQuick;
