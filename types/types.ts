export interface Company {
  id: string
  name: string
  slug: string
  description: string
}


export interface Job {
    id: string;
    experience: string
    title: string;
    applyUrl: string;
    company: {
      name: string;
    };
    locationsAvailable: string[];
    jobType: string;
    salary: string;
    postedAt: string;
    description: string;
    slug: string;
  }

export interface JobFormData {
  name: string;
  website: string;
  description: string;
  companyType: string;
  tags: string;
  logo: File | null;
}

export interface CompanyIndividual {
  name: string;
  website: string;
  description: string;
  companyType: string;
  tags: string[];
  slug: string;
  benefits: string[];
  logo?: string;
  jobs: {
    title: string;
    jobType: string;
    postedAt: Date;
    slug: string;
  }[];
}