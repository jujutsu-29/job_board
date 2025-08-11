import JobsClient from "@/components/jobs/JobClient";
import { getAllJobs } from "@/lib/actions/jobs";

// ✅ Force static generation
export const dynamic = "force-static";
// ✅ Keep cache forever until manually revalidated
export const revalidate = false;


export default async function JobsPage(){
  const jobs = await getAllJobs();
  return <JobsClient jobs={jobs}/>
}
