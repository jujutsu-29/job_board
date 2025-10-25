import { GoogleGenAI } from "@google/genai";
import Ajv from "ajv";
import { stripQuotes } from "../utils";
import { geminiResponseGetter } from "../gemini";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

type JobInput = {
  title: string;
  description?: string;
  requirements?: string[];
  keyResponsibilities?: string[];
  basicQualifications?: string[];
};

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


function extractGeneratedText(resp: any): string | null {
  if (!resp) return null;
  if (typeof resp.text === "string" && resp.text.trim().length)
    return resp.text;
  const cand = resp.candidates?.[0];
  if (cand?.content?.parts?.[0]?.text) return cand.content.parts[0].text;
  if (typeof resp.response?.text === "function") {
    try {
      return resp.response.text();
    } catch {}
  }
  return null;
}

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

  const prompt = `
You are a professional editor. 
Rephrase EVERY string value in the provided JSON object. 
Do not leave any field unchanged, even if it looks good already. 
Keep the structure, keys, and types EXACTLY the same. 
Return ONLY valid JSON, no explanations.

Input JSON:
${JSON.stringify(filtered, null, 2)}
`;

  let response = await geminiResponseGetter({prompt, schema, ai});
  // 5) extract text
  const raw = extractGeneratedText(response);
  if (!raw) {
    throw new Error("No text returned from Gemini");
  }

  // 6) Some responses may be fenced like ```json ... ``` — strip fences
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/```$/, "")
    .trim();

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
  for (const k of Object.keys(filtered))
    result[k as keyof JobInput] = parsed[k];

  return result; // safe to push directly to DB
}

export async function describeCompanyFromUrl(url: string): Promise<string> {
  const prompt = `Write a unique, professional 150-word description of this company based solely on the content from the provided URL. Avoid copying verbatim; ensure the tone is informative and original. URL: ${url}`;

  // const response = await ai.models.generateContent({
  //   model: "gemini-2.5-flash",  // model that supports URL Context
  //   contents: prompt,
  //   config: {
  //     tools: [{ urlContext: {} }],
  //     maxOutputTokens: 300,
  //   },
  // });

  let response = await geminiResponseGetter({prompt, schema: { type: "string" }, ai});

  console.log("response after calling description change ", response);

  // Extract the output text (content may be in response.text or wrapped)
  const text = response.text ?? response.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No response from Gemini");

  return stripQuotes(text.trim());
}

export async function getJobDetailsFromUrl(url: string) {
  const schema = {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      requirements: { type: "array", items: { type: "string" } },
      keyResponsibilities: { type: "array", items: { type: "string" } },
      basicQualifications: { type: "array", items: { type: "string" } },
      jobType: { type: "string" },
      salary: { type: "string" },
      experience: { type: "string" },
      technicalSkills: { type: "array", items: { type: "string" } },
      locationsAvailable: { type: "array", items: { type: "string" } },
      applyUrl: { type: "string" },
      company: { type: "string" },
    },
    required: [
      "title",
      "description",
      "requirements",
      "keyResponsibilities",
      "basicQualifications",
    ],
    additionalProperties: false,
  };

  const prompt = `
You are an expert job description parser. 
Extract the following details from the provided URL and return them as a valid JSON object.
Make sure to follow the provided schema exactly.
URL: ${url}
`;

  let response = await geminiResponseGetter({ prompt, schema, ai });

  console.log("response after calling gemini ", response);
  const raw = extractGeneratedText(response);
  if (!raw) {
    throw new Error("No text returned from Gemini");
  }

  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/```$/, "")
    .trim();

  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      console.error("Gemini returned unparsable JSON:", cleaned);
      throw new Error("Gemini output not valid JSON");
    }
  }

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const ok = validate(parsed);
  if (!ok) {
    console.error("Schema validation failed:", validate.errors);
    throw new Error("Generated JSON did not match schema");
  }

  return parsed;
}