import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateStoryline = async (messages: { role: string; content: string }[]) => {
  try {

    const prompt = `
    You are an adventure storyteller. 
    Please respond to the user's question and then give exactly 3 choices for them to continue the story.

    The response must be in the following JSON format:

    {
        "response": "The main storyline response based on the user's input.",
        "choice1": "A brief description of the first choice",
        "choice2": "A brief description of the second choice",
        "choice3": "A brief description of the third choice"
      
    }
    `;

    const contents = [
      ...messages.map((message) => ({
        role: message.role,
        parts: [{ text: message.content }],
      })),
      {
        role: "user",
        parts: [{ text: prompt }],
      }, 
    ];

    const response = await model.generateContent({
      contents: contents,
    });

    var textResponse = response.response.text();

    textResponse = textResponse.replace(/```json|```/g,'').trim()
    const parsedResponse = JSON.parse(textResponse);
    console.log(parsedResponse)

    return parsedResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { response: "An error occurred.", choices: [] };
  }
};
