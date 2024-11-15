import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const womensFashion = await prisma.category.create({
    data: {
      name: 'Women\'s Fashion',
    },
  });

  // Create Subcategories under Women's Fashion
  const dresses = await prisma.subCategory.create({
    data: {
      name: 'Dresses',
      categoryId: womensFashion.id,
    },
  });

  const bottoms = await prisma.subCategory.create({
    data: {
      name: 'Bottoms',
      categoryId: womensFashion.id,
    },
  });

  const tops = await prisma.subCategory.create({
    data: {
      name: 'Tops',
      categoryId: womensFashion.id,
    },
  });

  const outerwear = await prisma.subCategory.create({
    data: {
      name: 'Outerwear',
      categoryId: womensFashion.id,
    },
  });

  // Image URLs provided
  const imageUrls = [
    'https://new-ella-demo.myshopify.com/cdn/shop/products/image12bxxl_243f353e-eda6-4878-b51e-c6588689501d.jpg?v=1658119228',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/image12xxl_70ddd643-0170-4b31-9051-0cceeeea4e1c.jpg?v=1658119228',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/image11xxl_1ffbafc6-9789-4e17-86ce-1f6dc4405041d.jpg?v=1658119228',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/image22xxl.jpg?v=1658119200',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/image11bxxl_c7f03d8c-b2b2-4ce4-8cd4-b6095578e871.jpg?v=1658119228',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/Aries_Top_1_1-e22af7f40e761ac1640bb9f39898_145278d0-ef88-4713-bb7c-d1fb193c374a.jpg?v=1658215904',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/image9xxl-MAGENTA_73f6c1dd-2aa6-4e8b-9765-37287380796f.jpg?v=1658215904',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/image9xxl-LIGHT-RED_a0b018f7-66e2-4144-8546-6b1db9f713f3.jpg?v=1658215904',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/image9xxl-PINK_f9f9b7c5-c812-4b8a-9cdc-7cb656364582.jpg?v=1658215904',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/image9xxl-TURQUOISE_06bd143f-6ac5-4638-9fbe-d4b1a096a9ef.jpg?v=1658215904',
    'https://new-ella-demo.myshopify.com/cdn/shop/products/image9xxl-WHITE_415d23ad-4b88-453e-a7a1-7cd90a8d3b9b.jpg?v=1658215904'
  ];

  // Helper function to get a random image URL from the list
  function getRandomImageUrl() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  }

  // Create Products with Variants and Images
  const floralPrintDress = await prisma.product.create({
    data: {
      title: 'Floral Print Dress',
      description: 'A beautiful floral print dress perfect for summer.',
      price: 49.99,
      stock: 0, // Will use variants for stock
      subcategoryId: dresses.id,
      userId:"e49288f2-d118-4edb-82d7-8ccbf3476471",
      variants: {
        create: [
          {
            color: '#FF6347', // Red Floral
            colorName: 'Red Floral',
            sizes: {
              create: [
                { size: 'S', stock: 5 },
                { size: 'M', stock: 10 },
                { size: 'L', stock: 15 },
              ],
            },
            images: {
              create: [
                { url: getRandomImageUrl() },
                { url: getRandomImageUrl() },
              ],
            },
          },
          {
            color: '#4682B4', // Blue Floral
            colorName: 'Blue Floral',
            sizes: {
              create: [
                { size: 'S', stock: 8 },
                { size: 'M', stock: 12 },
                { size: 'L', stock: 10 },
              ],
            },
            images: {
              create: [
                { url: getRandomImageUrl() },
                { url: getRandomImageUrl() },
              ],
            },
          },
        ],
      },
    },
  });

  const highWaistJeans = await prisma.product.create({
    data: {
      title: 'High-Waist Jeans',
      description: 'Stylish and comfortable high-waist jeans.',
      price: 39.99,
      stock: 0, // Will use variants for stock
      subcategoryId: bottoms.id,
      userId:"e49288f2-d118-4edb-82d7-8ccbf3476471",
      variants: {
        create: [
          {
            color: '#1E3A5F', // Dark Blue
            colorName: 'Dark Blue',
            sizes: {
              create: [
                { size: '28', stock: 6 },
                { size: '30', stock: 9 },
                { size: '32', stock: 7 },
              ],
            },
            images: {
              create: [
                { url: getRandomImageUrl() },
                { url: getRandomImageUrl() },
              ],
            },
          },
          {
            color: '#ADD8E6', // Light Blue
            colorName: 'Light Blue',
            sizes: {
              create: [
                { size: '28', stock: 5 },
                { size: '30', stock: 8 },
                { size: '32', stock: 4 },
              ],
            },
            images: {
              create: [
                { url: getRandomImageUrl() },
                { url: getRandomImageUrl() },
              ],
            },
          },
        ],
      },
    },
  });

  const cottonTshirt = await prisma.product.create({
    data: {
      title: 'Cotton T-shirt',
      description: 'A soft and comfortable cotton T-shirt.',
      price: 19.99,
      stock: 0, // Will use variants for stock
      subcategoryId: tops.id,
      userId:"e49288f2-d118-4edb-82d7-8ccbf3476471",
      variants: {
        create: [
          {
            color: '#FFFFFF', // White
            colorName: 'White',
            sizes: {
              create: [
                { size: 'S', stock: 8 },
                { size: 'M', stock: 12 },
              ],
            },
            images: {
              create: [
                { url: getRandomImageUrl() },
                { url: getRandomImageUrl() },
              ],
            },
          },
          {
            color: '#000000', // Black
            colorName: 'Black',
            sizes: {
              create: [
                { size: 'S', stock: 7 },
                { size: 'M', stock: 10 },
              ],
            },
            images: {
              create: [
                { url: getRandomImageUrl() },
                { url: getRandomImageUrl() },
              ],
            },
          },
        ],
      },
    },
  });

  const sleevelessBlouse = await prisma.product.create({
    data: {
      title: 'Sleeveless Blouse',
      description: 'A chic sleeveless blouse for warm days.',
      price: 29.99,
      stock: 0, // Will use variants for stock
      subcategoryId: tops.id,
      userId:"e49288f2-d118-4edb-82d7-8ccbf3476471",
      variants: {
        create: [
          {
            color: '#F5F5DC', // Beige
            colorName: 'Beige',
            sizes: {
              create: [
                { size: 'S', stock: 5 },
                { size: 'M', stock: 7 },
                { size: 'L', stock: 13 },
              ],
            },
            images: {
              create: [
                { url: getRandomImageUrl() },
                { url: getRandomImageUrl() },
              ],
            },
          },
          {
            color: '#FFFFFF', // White
            colorName: 'White',
            sizes: {
              create: [
                { size: 'S', stock: 6 },
                { size: 'M', stock: 8 },
                { size: 'L', stock: 10 },
              ],
            },
            images: {
              create: [
                { url: getRandomImageUrl() },
                { url: getRandomImageUrl() },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
