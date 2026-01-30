import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

console.log("Using key:", process.env.GROQ_API_KEY?.slice(0, 10));

const test = async () => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
       model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: "Hello, just test reply" }
      ],
    }),
  });

  const data = await response.json();
  console.log("Groq test response:", data);
};

test();
