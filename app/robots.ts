import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://faberland.com' // Replace with your actual domain
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
        '/admin/',
        '/_next/',
        '/private/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
