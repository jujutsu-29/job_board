// /* app/jobs/[slug]/opengraph-image.tsx */
// import { ImageResponse } from "next/og";
// import { jobsBySlug } from "@/lib/server/jobs"; // your function

// // export const runtime = "edge"; // faster execution

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const job = await jobsBySlug((await params).id);

//   if (!job) {
//     return new Response("Not Found", { status: 404 });
//   }

//   // console.log("aws job ", job);

//   return new ImageResponse(
//     (
//       <div
//         style={{
//           display: "flex",
//           fontFamily: "sans-serif",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "flex-start",
//           width: "1200px",
//           height: "630px",
//           background: "linear-gradient(135deg, #1e293b, #0f172a)",
//           color: "white",
//           padding: "60px",
//           // fontFamily: "sans-serif",
//         }}
//       >
//         {/* Company Logo */}
//         {job.company.logo && (
//           <img
//             src={job.company.logo}
//             width="120"
//             height="120"
//             style={{ borderRadius: "16px", marginBottom: "30px" }}
//           />
//         )}

//         {/* Title */}
//         <h1
//           style={{ fontSize: "64px", fontWeight: "bold", marginBottom: "20px" }}
//         >
//           {job.title}
//         </h1>

//         {/* Subtitle */}
//         <p style={{ fontSize: "32px", opacity: 0.85 }}>
//           {job.company.name} • {job.locationsAvailable.join(", ")}
//         </p>

//         {/* Salary */}
//         {job.salary && (
//           <p style={{ fontSize: "28px", marginTop: "20px" }}>💰 {job.salary}</p>
//         )}

//         {/* Eligible Batches */}
//         {job.batches && (
//           <p style={{ fontSize: "26px", marginTop: "10px", opacity: 0.8 }}>
//             🎓 Eligible: {job.batches}
//           </p>
//         )}
//       </div>
//     ),
//     {
//       width: 1200,
//       height: 630,
//     }
//   );
// }


/* app/jobs/[slug]/opengraph-image.tsx */
import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import { jobsBySlug } from "@/lib/server/jobs"; // your prisma function

export const runtime = "nodejs"; // ✅ needed to use fs

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const job = await jobsBySlug(params.id);
  if (!job) {
    return new Response("Not Found", { status: 404 });
  }

  // ✅ Load your own font instead of relying on noto-sans (buggy on Windows)
  const fontPath = path.join(process.cwd(), "public/fonts/Inter-Regular.ttf");
  const fontData = fs.readFileSync(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          color: "white",
          padding: "60px",
          fontFamily: "Inter", // use the embedded font
        }}
      >
        {/* Company Logo */}
        {/* {job.company.logo && ( */}
          <img
            src={job.company.logo ?? ""}
            width="120"
            height="120"
            style={{ borderRadius: "16px", marginBottom: "30px" }}
          />
        {/* )} */}

        {/* Title */}
        <h1
          style={{ fontSize: "64px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {job.title}
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: "32px", opacity: 0.85 }}>
          {job.company.name} • {job.locationsAvailable.join(", ")}
        </p>

        {/* Salary */}
        {job.salary && (
          <p style={{ fontSize: "28px", marginTop: "20px" }}>💰 {job.salary}</p>
        )}

        {/* Eligible Batches */}
        {job.batches && (
          <p style={{ fontSize: "26px", marginTop: "10px", opacity: 0.8 }}>
            🎓 Eligible: {job.batches}
          </p>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
