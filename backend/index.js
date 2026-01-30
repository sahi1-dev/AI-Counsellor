import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/counsel", async (req, res) => {
  const { problem } = req.body;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `
You are an AI study-abroad counsellor.

Your ONLY job is to guide students through study-abroad planning.

You must strictly follow these stages:
1. Build academic and career profile
2. Recommend universities
3. Help lock ONE university
4. Guide application steps

Rules:
- DO NOT act as a medical or mental health counsellor
- DO NOT give emotional or therapy-style responses
- Ask only academic, career, and education-related questions
- Be concise and structured
- When profile information is sufficient, say exactly: [STAGE_COMPLETE]
- When you list universities, end with: [READY_TO_LOCK]
- When a university is selected, confirm it and end with: [LOCK_DONE]
              `,
            },
            {
              role: "user",
              content: problem,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({
        reply: "AI response error. Please try again.",
      });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ reply: "Server error. Try again later." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
