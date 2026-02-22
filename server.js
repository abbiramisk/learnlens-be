require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("LearnLens Backend Running 🚀");
});

app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const data = new Uint8Array(fs.readFileSync(req.file.path));

    const pdfDoc = await pdfjsLib.getDocument({ data }).promise;

    let extractedText = "";

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();

      const strings = content.items.map((item) => item.str);
      extractedText += strings.join(" ") + "\n";
    }

    const response = await genAI.models.generateContent({
      model: "models/gemini-2.5-flash",
      contents: `
      You are an educational AI.
      
      Based on the following textbook content, generate:
      
      Short summary
      5 important questions
      3 study suggestions
      
      Text:
      ${extractedText.substring(0, 4000)}
      `,
    });

    res.json({
      message: "PDF processed and analyzed",
      aiOutput: response.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "PDF processing failed" });
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
