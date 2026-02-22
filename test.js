require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
  const response = await genAI.models.generateContent({
    model: "models/gemini-2.5-flash",
    contents: "Say hello in one sentence.",
  });

  console.log(response.text);
}

test();