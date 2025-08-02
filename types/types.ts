export interface Company {
  id: string
  name: string
  slug: string
  industry: string
  description: string
}




export interface Job {
    id: number;
    title: string;
    applyUrl: string;
    company: {
      name: string;
    };
    location: string;
    type: string;
    salary: string;
    posted: string;
    description: string;
    slug: string;
    requirements: string[];
    benefits: string[];
  }




