require("dotenv").config();
const fs = require("fs");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function fileToDataUrl(filePath) {
  const imageBuffer = fs.readFileSync(filePath);
  const base64Image = imageBuffer.toString("base64");
  const ext = filePath.split(".").pop().toLowerCase();

  let mimeType = "image/jpeg";
  if (ext === "png") mimeType = "image/png";
  if (ext === "webp") mimeType = "image/webp";

  return `data:${mimeType};base64,${base64Image}`;
}

async function extractBusinessCardData(filePath) {
  const dataUrl = fileToDataUrl(filePath);

  const prompt = `
You are an expert business card information extractor.

Extract the following fields from the business card image and return ONLY valid JSON.
Do not include markdown fences.
If a field is missing, return an empty string.
If multiple company domains are present, return them as an array.

Expected JSON format:
{
  "companyName": "",
  "personName": "",
  "address": "",
  "telephoneNo": "",
  "phoneNo": "",
  "emailId": "",
  "companyDomainName": []
}
`;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          {
            type: "input_image",
            image_url: dataUrl,
            detail: "high"
          }
        ]
      }
    ]
  });

  const text = response.output_text;

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Failed to parse JSON from OpenAI response: " + text);
  }
}

module.exports = {
  extractBusinessCardData
};