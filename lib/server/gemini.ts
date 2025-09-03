// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

// export async function rephraseIT() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }


// export async function rephraseIt(jobData: {
//   description: string;
//   requirements: string[];
//   keyResponsibilities: string[];
//   basicQualifications: string[];
// }) {
//     const filteredData: Record<string, any> = {};
//   if (jobData.description && jobData.description.trim() !== "") {
//     filteredData.description = jobData.description;
//   }
//   if (jobData.requirements && jobData.requirements.length > 0) {
//     filteredData.requirements = jobData.requirements;
//   }
//   if (jobData.keyResponsibilities && jobData.keyResponsibilities.length > 0) {
//     filteredData.keyResponsibilities = jobData.keyResponsibilities;
//   }
//   if (jobData.basicQualifications && jobData.basicQualifications.length > 0) {
//     filteredData.basicQualifications = jobData.basicQualifications;
//   }

//   const prompt = `
// You are a rephrasing assistant.  
// I will provide a JSON object containing job-related fields such as description, requirements, responsibilities, and qualifications.  
// Rephrase the text values of each field while keeping the JSON structure and keys exactly the same.  
// Do not remove or rename any keys.  
// Do not add extra text.  
// Return only valid JSON.

// Here is the JSON to rephrase:
// ${JSON.stringify(filteredData, null, 2)}
// `;

// try {
//   const result = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//     config: { responseMimeType: "application/json" },
//   });
// //   const response = result;

// //   console.log("response coming from gemini:", response);
// //   console.log("CANDIDATES coming from gemini:", response.candidates?.forEach((candidate: any) => {
// //     console.log("Candidate:", candidate);
// //   }));
// //   console.log("prompt token details coming from gemini:", response.usageMetadata?.promptTokensDetails?.forEach((detail: any) => {
// //     console.log("Detail:", detail);
// //   }));

//   const textOut = result.text;
//   console.log("Gemini replied:", textOut);

//   return textOut;
//   // Parse Gemini's response back into JSON
//     // const parsed = JSON.parse(response);
//     // return parsed;
//   } catch (e) {
//     console.error("Invalid JSON from Gemini:", (e as any).message);
//     throw new Error("Gemini did not return valid JSON");
//   }
// }




import { GoogleGenAI } from "@google/genai";
import Ajv from "ajv";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

type JobInput = {
  description?: string;
  requirements?: string[];
  keyResponsibilities?: string[];
  basicQualifications?: string[];
  // add other fields you might send
};

/**
 * Build a minimal JSON schema for only the supplied keys.
 * Arrays -> array of strings; strings -> string.
 */
function makeSchemaFor(obj: Record<string, any>) {
  const props: Record<string, any> = {};
  const required: string[] = [];

  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string") {
      props[k] = { type: "string" };
      required.push(k);
    } else if (Array.isArray(v)) {
      props[k] = { type: "array", items: { type: "string" } };
      required.push(k);
    } else {
      // fallback
      props[k] = { type: "string" };
      required.push(k);
    }
  }

  return {
    type: "object",
    properties: props,
    required,
    additionalProperties: false,
  };
}

/**
 * Safely extracts the generated text from the SDK's response object.
 * SDK shapes vary; this tries the usual fields.
 */
function extractGeneratedText(resp: any): string | null {
  if (!resp) return null;
  // some SDK versions expose `.text`
  if (typeof resp.text === "string" && resp.text.trim().length) return resp.text;
  // older/more verbose shape: candidates[].content.parts[].text
  const cand = resp.candidates?.[0];
  if (cand?.content?.parts?.[0]?.text) return cand.content.parts[0].text;
  // some wrappers: resp.response?.text()
  if (typeof resp.response?.text === "function") {
    try { return resp.response.text(); } catch {}
  }
  return null;
}

/**
 * The main rewriter. Returns parsed JSON with same keys/types you sent.
 */
export async function rephraseItStructured(jobData: JobInput) {
  // 1) filter empty fields
  const filtered: Record<string, any> = {};
  for (const [k, v] of Object.entries(jobData)) {
    if (typeof v === "string") {
      if (v.trim()) filtered[k] = v;
    } else if (Array.isArray(v) && v.length) {
      filtered[k] = v;
    }
  }
  if (Object.keys(filtered).length === 0) {
    throw new Error("No fields to rephrase");
  }

  // 2) build a responseSchema matching only those keys
  const schema = makeSchemaFor(filtered);

  // 3) Compose a short system + user instruction (be strict)
//   const prompt = [
//     {
//       role: "system",
//       content: [
//         {
//           type: "text",
//           text: `You are a professional editor that rewrites job posting fields. 
// Return ONLY a JSON object that matches the requested schema exactly (same keys & types). 
// Do not add keys, do not invent facts, and do not add explanatory text.`
//         }
//       ]
//     },
//     {
//       role: "user",
//       content: [
//         {
//           type: "text",
//           text: `Input JSON:\n${JSON.stringify(filtered, null, 2)}\n\nReturn the rewritten JSON now.`
//         }
//       ]
//     }
//   ];

const prompt = `
You are a professional editor. 
Rephrase EVERY string value in the provided JSON object. 
Do not leave any field unchanged, even if it looks good already. 
Keep the structure, keys, and types EXACTLY the same. 
Return ONLY valid JSON, no explanations.

Input JSON:
${JSON.stringify(filtered, null, 2)}
`;


  // 4) Call Gemini (structured output)
  // const response = await ai.models.generateContent({
  //   // model choice: 2.5-flash is fast + supports JSON mode; use prod model when needed
  //   model: "gemini-2.5-flash",
  //   contents: prompt,
  //   // Use `config` (or generationConfig depending on SDK version) to force JSON mode.
  //   // cloud docs and SDK examples show `config` or `generationConfig`. `config` works in examples.
  //   config: {
  //     responseMimeType: "application/json",
  //     responseSchema: schema,
  //     maxOutputTokens: 2000
  //   },
  // });

  const response = await ai.models.generateContent({
  model: "gemini-2.5-pro",
  contents: prompt,   // ✅ just a string, not an array of objects
  config: {
    responseMimeType: "application/json",
    responseSchema: schema,
    maxOutputTokens: 2000
  },
});

  // 5) extract text
  const raw = extractGeneratedText(response);
  if (!raw) {
    throw new Error("No text returned from Gemini");
  }

  // 6) Some responses may be fenced like ```json ... ``` — strip fences
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```$/, "").trim();

  // 7) parse JSON
  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    // last-resort: try to find first {...} block
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      console.error("Gemini returned unparsable JSON:", cleaned);
      throw new Error("Gemini output not valid JSON");
    }
  }

  // 8) Validate against schema with Ajv
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const ok = validate(parsed);
  if (!ok) {
    console.error("Schema validation failed:", validate.errors);
    throw new Error("Generated JSON did not match schema");
  }

  // 9) Merge parsed fields into original jobData (only replace keys we sent)
  const result = { ...jobData };
  for (const k of Object.keys(filtered)) result[k as keyof JobInput] = parsed[k];

  return result; // safe to push directly to DB
}
