/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['fastly.picsum.photos','picsum.photos','images.unsplash.com',
      'new-ella-demo.myshopify.com','lozvbgblszssvycgynsh.supabase.co'], // Add the domain here
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;
  