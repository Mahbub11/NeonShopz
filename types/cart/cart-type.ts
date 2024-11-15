export interface CartItem {
    id: number; // Product ID
    title: string;
    price: number;
    quantity: number;
    variantId?: number; // For products with variants
    stockId?: number; // For products with stock
    size?: string; // For size selection
    color?: string; // For color selection (if applicable)
    colorName?: string; // For color
  }