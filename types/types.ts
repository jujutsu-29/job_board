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
}