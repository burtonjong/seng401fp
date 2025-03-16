import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY as string); 

export const generateStoryline = async (messages: { role: string; content: string }[]) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent({
      contents: messages.map((message) => ({
        role: message.role,
        parts: [{ text: message.content }],
      })),
    });

    return response.response.text(); 
  } catch (error) {
    console.error("Gemini API Error:", error);
  }
};
