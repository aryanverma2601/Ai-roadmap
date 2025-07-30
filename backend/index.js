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
          content: `You are an expert product strategist and professional roadmap architect with over 15 years of experience in tech project planning, stakeholder alignment, and Agile execution.

Your task is to generate a step-by-step project roadmap for the following topic: "${req.body.topic}".

The output must strictly be a JSON array. Each roadmap step should follow this exact format:
{
  "title": "Step Title",
  "description": "Brief explanation of the step.",
  "id": "step_number_as_string",
  "estimated_time": "estimated time in hours or days"
}

Important: Do not include any introduction or explanation. Just return a well-structured JSON array as described above.`,
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
