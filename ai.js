import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const title = process.env.ISSUE_TITLE;
const body = process.env.ISSUE_BODY;

const prompt = `
Ты программист.

Сделай задачу:
${title}

Описание:
${body}

Верни ТОЛЬКО так:

FILE: result.txt
CODE:
AI работает
`;

const res = await client.chat.completions.create({
  model: "gpt-5.3-mini",
  messages: [{ role: "user", content: prompt }],
});

const text = res.choices[0].message.content;

const match = text.match(/FILE:\s(.+)\nCODE:\n([\s\S]+)/);

if (match) {
  fs.writeFileSync(match[1], match[2]);
}
