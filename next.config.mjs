/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        pathname: '/private/org-l0puj8YnHoDtN52Ic6HaoIL0/user-xf3MenXpKAmPLzkvHW2tevoG/**'
      }
    ]
  }
};

export default nextConfig;
