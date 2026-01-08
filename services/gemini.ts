import { GoogleGenAI } from "@google/genai";
import { WritingStyle } from "../types";

const SYSTEM_PROMPT = `Role: Kamu adalah asisten penulis laporan magang yang ahli.
Task: Kembangkan poin-poin singkat yang diberikan pengguna menjadi paragraf laporan harian yang detail dan koheren dalam Bahasa Indonesia.
Constraint: Kamu HARUS menulis minimal 100 kata per bagian. Kembangkan detailnya, tambahkan konteks, jelaskan prosesnya, dan buat terdengar profesional namun tetap natural (kecuali pengguna meminta gaya lain). Jangan gunakan penomoran (bullet points) di output, tulis dalam bentuk paragraf narasi.`;

export const generateSection = async (
  input: string,
  style: WritingStyle,
  sectionName: string
): Promise<string> => {
  // Access API key from environment variable as requested
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key hilang. Pastikan process.env.API_KEY sudah diatur.");
  }
  
  if (!input.trim()) return "";

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Context: Menulis bagian "${sectionName}" untuk laporan harian magang.
    Style: ${style}
    Input Poin-poin: ${input}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return response.text || "Gagal membuat teks.";
  } catch (error) {
    console.error(`Error generating ${sectionName}:`, error);
    throw error;
  }
};