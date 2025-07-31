import Groq from "groq-sdk";
import express from "express";
import cors from "cors";
import "dotenv/config";

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function cleanAIResponse(content) {
  if (!content) return "";
  const match = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);

  //   ````  Matches the backticks (code block markers)
  // (?:json)?	Matches the word json if it exists (optional)
  // \s*	Skips spaces or newlines
  // ([\s\S]*?)	This is the important part: it captures the actual JSON text inside the code block
  // i	Makes it case-insensitive

  if (match && match[1]) {
    //     match	Means we found a code block in the string
    // match[1]	Means we also captured the inside content, i.e., the actual JSON array

    return match[1].trim();
  }

  const arrayMatch = content.match(/\[\s*\{[\s\S]*?\}\s*\]/);
  if (arrayMatch && arrayMatch[0]) {
    // This tries to directly find a JSON array in the response — without needing the backticks.
    return arrayMatch[0].trim();
  }

  throw new Error("No valid JSON block found in response");
}

app.post("/api/generate-roadmap", async (req, res) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are a senior product manager and technical roadmap architect with over 15 years of experience in planning software products and tech tools across various industries.

Your job is to generate a clear, structured, and **topic-specific** step-by-step project roadmap for the following idea: **"${req.body.topic}"**.

📌 Your roadmap should:
- Be relevant to the specific domain and user base of the topic
- Include technical and non-technical steps if needed
- Include at least 6–10 diverse steps, from planning to final delivery
- Be unique and not repeated from previous responses

🧾 The output format should strictly be a valid **JSON array** where each object follows:
{
  "id": "step_number_as_string",
  "title": "Step title (unique and meaningful)",
  "description": "1-2 line description explaining what happens in this step",
  "estimated_time": "X hours / X days / X weeks"
}

Return ONLY the JSON array, without backticks or explanations.`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    let aiContent = chatCompletion.choices[0]?.message?.content;
    // console.log("Raw Response:", aiContent);
    // cleaning of aiContent because it may contain some extra characters

    const cleanContent = await cleanAIResponse(aiContent);
    let roadmap = JSON.parse(cleanContent);
    // console.log("Cleaned Roadmap:", roadmap);
    res.json(roadmap);
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
