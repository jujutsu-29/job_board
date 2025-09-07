import { GoogleGenAI } from "@google/genai";

  export async function geminiResponseGetter ({prompt, schema, ai}: {prompt: any, schema: any, ai: GoogleGenAI}) {
    const models = [
        "gemini-2.5-pro",
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
        "gemini-2.0-flash",
        "gemini-2.0-flash-lite",
      ]; // fallback list
      let response;
    
      for (const model of models) {
        try {
          response = await callGemini(model, prompt, schema);
          console.log(`✅ Success with model: ${model}`);
          break; // stop on first success
        } catch (err: any) {
          console.warn(`❌ Model ${model} failed: ${err.message}`);
          if (err.status === 503) {
            continue; // overloaded → try next model
          }
          throw err; // other errors bubble up
        }
      }
    
      if (!response) {
        throw new Error("All Gemini models overloaded. Try later.");
      }
    
      async function callGemini(model: string, prompt: any, schema?: any) {
        return ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: schema,
            maxOutputTokens: 2000,
          },
        });
      }

      return response;
  }