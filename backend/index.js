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
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content: `
                  You are an AI study-abroad counsellor.
                  Help students with admissions, profile evaluation, university shortlisting,
                  SOP, LOR, exams, and application strategy.
                  Be practical, structured, and admission-focused.
                  `,
              },
              {
                role: "user",
                content: problem,
              },
            ],
            temperature: 0.7,
            max_tokens: 600,
          }),
      }
    );

          const data = await response.json();
          console.log("AI TEXT:", data?.choices?.[0]?.message?.content);
          console.log("Groq raw response:", data);

          // ✅ REAL AI REPLY
          if (data?.choices?.[0]?.message?.content) {
            return res.json({
              reply: data.choices[0].message.content,
            });
          }

          // 🛟 FALLBACK (ONLY IF GROQ FAILS)
          return res.json({
            reply:
              "I'm here to help with your study abroad journey. Could you tell me more about your academic background or goals?",
          });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ reply: "Server error. Try again later." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});