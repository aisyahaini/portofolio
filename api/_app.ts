import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { ContentData, ContactMessage } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Static content, bundled alongside the function — see data/content.json
// and PANDUAN-KONTEN.md for what each field controls.
const content: ContentData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "content.json"), "utf-8")
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Serverless functions have no persistent disk, so contact messages can't
 * be saved to a file the way the old server/ setup did. Every message is
 * logged (visible in Vercel's function logs / dashboard → your project →
 * Logs), and if RESEND_API_KEY + CONTACT_TO_EMAIL are set as environment
 * variables, it's also emailed via Resend's HTTP API — no extra package
 * needed, just a plain fetch call. Swap this for any other provider if
 * you prefer.
 */
async function notifyContact(entry: ContactMessage) {
  console.log("[contact]", JSON.stringify(entry));

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to,
        reply_to: entry.email,
        subject: `New portfolio message from ${entry.name}`,
        text: `${entry.message}\n\n— ${entry.name} <${entry.email}>`,
      }),
    });
  } catch (err) {
    // Never fail the request just because the email notification failed —
    // the message is already logged above either way.
    console.error("[contact] email notification failed:", err);
  }
}

const app = express();

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/profile", (_req, res) => {
  res.json(content.profile);
});

app.get("/api/skills", (_req, res) => {
  res.json(content.skills);
});

app.get("/api/experience", (_req, res) => {
  res.json(content.experience);
});

app.get("/api/education", (_req, res) => {
  res.json(content.education);
});

app.get("/api/research", (_req, res) => {
  res.json(content.research);
});

app.get("/api/projects", (_req, res) => {
  res.json(content.projects);
});

app.get("/api/projects/:id", (req, res) => {
  const project = content.projects.find((p) => p.id === req.params.id);
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json(project);
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (typeof name !== "string" || name.trim().length < 2) {
    res.status(400).json({ error: "Name must be at least 2 characters." });
    return;
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: "Please provide a valid email address." });
    return;
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    res.status(400).json({ error: "Message must be at least 10 characters." });
    return;
  }

  const entry: ContactMessage = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };

  await notifyContact(entry);

  res.status(201).json({ ok: true });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
