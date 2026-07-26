// Local development only. Vercel ignores files starting with "_" inside
// /api, so this never becomes a deployed function — it just runs the same
// app from _app.ts as a plain Node server, for `npm run dev`.
import "dotenv/config";
import app from "./_app.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`Local API running on http://localhost:${PORT}`);
});
