export interface Company {
  id: string
  name: string
  slug: string
  industry: string
  description: string
}


export interface Job {
    id: number;
    experience: string
    title: string;
    applyUrl: string;
    company: {
      name: string;
    };
    locationsAvailable: string[];
    jobType: string;
    salary: string;
    posted: string;
    description: string;
    slug: string;
    requirements: string[];
  }




