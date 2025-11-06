import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// FIX: Removed deprecated top-level generationConfig. Config is now passed directly to each call.
const modelConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
};

export const generateInfographicStream = async (text: string): Promise<AsyncGenerator<GenerateContentResponse>> => {
    const stream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [{
                text: `Convert the following text into a visually stunning, modern, and professional infographic. 
                
                IMPORTANT RULES:
                1.  Your response MUST be ONLY the raw HTML code. Do not wrap it in markdown backticks (e.g., \`\`\`html) or any other formatting.
                2.  All styling MUST be done using Tailwind CSS classes. Do not use any other styling methods.
                3.  The output must be a single, self-contained HTML structure.
                4.  Structure the content logically with headings, lists, and visual elements.
                5.  Use SVG icons where appropriate to enhance visual appeal. Ensure SVGs are embedded directly in the HTML.
                6.  If data is present, visualize it using simple bar charts or graphs made from styled divs.
                7.  Use a professional and appealing color palette. The primary color should be a vivid indigo (#4F46E5), with accents of emerald green (#10B981) and neutral grays. Good contrast is important for readability.
                
                Text to convert:
                ---
                ${text}
                ---
                `
            }]
        },
        config: {
            ...modelConfig,
        }
    });
    return stream;
};

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      ...modelConfig,
      systemInstruction: `You are an AI assistant that helps users modify an existing HTML infographic. The user will provide the current HTML and a request for modification. Your task is to return only the complete, updated HTML code for the infographic, incorporating the user's request. 
      
      IMPORTANT RULES:
      1. Your response MUST be ONLY the raw HTML code. Do not wrap it in markdown backticks (e.g., \`\`\`html).
      2. The updated HTML must continue to use only Tailwind CSS classes for styling.
      3. Do not add any explanations, comments, or apologies. Just return the pure HTML.`,
    },
  });
};
