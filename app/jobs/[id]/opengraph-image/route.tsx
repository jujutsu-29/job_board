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
export const revalidate = false;

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const job = await jobsBySlug(params.id);
  if (!job) {
    return new Response("Not Found", { status: 404 });
  }

  // ✅ Load your own font instead of relying on noto-sans (buggy on Windows)
  // const fontPath = path.join(process.cwd(), "public/fonts/Inter-Regular.ttf");
  // const fontData = fs.readFileSync(fontPath);

  // Generate a unique gradient based on job/company name
  function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c1 = `hsl(${hash % 360}, 70%, 55%)`;
    const c2 = `hsl(${(hash * 3) % 360}, 80%, 40%)`;
    return [c1, c2];
  }
  const [color1, color2] = stringToColor(job.title + job.company.name);
  const gradient = `linear-gradient(120deg, ${color1} 0%, ${color2} 100%)`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: gradient,
          position: "relative",
        }}
      >
        {/* Glassmorphism Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "1000px",
            minHeight: "440px",
            background: "rgba(255,255,255,0.18)",
            borderRadius: "36px",
            boxShadow: "0 8px 48px 0 rgba(30, 64, 175, 0.18)",
            border: "2px solid rgba(255,255,255,0.25)",
            padding: "60px 80px",
            backdropFilter: "blur(12px)",
            color: "#fff",
            position: "relative",
          }}
        >
          {/* Company Logo - floating, premium look */}
          {job.company.logo && (
            <div
              style={{
                position: "absolute",
                top: "-60px",
                left: "60px",
                width: "120px",
                height: "120px",
                background: "rgba(255,255,255,0.7)",
                borderRadius: "50%",
                boxShadow: "0 4px 32px 0 rgba(30, 64, 175, 0.18)",
                border: "4px solid #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={job.company.logo}
                width="96"
                height="96"
                style={{ borderRadius: "50%", objectFit: "cover", width: "96px", height: "96px" }}
                alt="Company Logo"
              />
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontSize: "60px",
              fontWeight: 800,
              marginBottom: "24px",
              lineHeight: 1.1,
              color: "#fff",
              textShadow: "0 2px 16px rgba(30,64,175,0.18)",
              letterSpacing: "-2px",
              maxWidth: "820px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {job.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "32px",
              opacity: 0.92,
              fontWeight: 600,
              marginBottom: "18px",
              color: "#e0e7ef",
              textShadow: "0 1px 8px rgba(30,64,175,0.10)",
              maxWidth: "800px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {job.company.name} • {job.locationsAvailable.join(", ")}
          </p>

          {/* Salary */}
          {job.salary && (
            <p style={{ fontSize: "28px", marginTop: "10px", color: "#facc15", fontWeight: 700, textShadow: "0 1px 8px rgba(30,64,175,0.10)" }}>
              💰 {job.salary}
            </p>
          )}

          {/* Eligible Batches */}
          {job.batches && (
            <p style={{ fontSize: "24px", marginTop: "8px", opacity: 0.85, color: "#bae6fd", fontWeight: 600 }}>
              🎓 Eligible: {job.batches}
            </p>
          )}
        </div>

        {/* Decorative unique pattern (SVG) for extra uniqueness */}
        <svg width="1200" height="630" style={{position:'absolute',top:0,left:0}}>
          <defs>
            <radialGradient id="g1" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor={color1} stopOpacity="0.18" />
              <stop offset="100%" stopColor={color2} stopOpacity="0.04" />
            </radialGradient>
          </defs>
          <ellipse cx="900" cy="100" rx="320" ry="120" fill="url(#g1)" />
          <ellipse cx="300" cy="600" rx="220" ry="80" fill="url(#g1)" />
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
