import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { getAllCompanies } from '@/lib/actions/company'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rolespot.space'

  // Fetch all jobs
  const jobs = await prisma.job.findMany({
    select: { slug: true, updatedAt: true },
  })

  // Fetch all companies
  const companies = await prisma.company.findMany({
    select: { slug: true },
  })

  const jobUrls = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: job.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  const companyUrls = companies.map((company) => ({
    url: `${baseUrl}/companies/${company.slug}`,
    lastModified: new Date(), // Fallback since Company model lacks updatedAt
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/companies`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  return [...staticPages, ...jobUrls, ...companyUrls]
}
