export interface OrderItem {
    id: number; // Product ID    
    quantity: number;
    variantId?: number; // For products with variants
    stockId:number,
  }