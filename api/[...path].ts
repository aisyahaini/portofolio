// Vercel's filesystem routing: a file named [...path].ts inside /api
// matches every request under /api/* (any depth) and forwards it to a
// single serverless function. Express apps satisfy the (req, res) handler
// signature Vercel's Node runtime expects, so exporting it directly here
// is enough — no adapter package needed.
import app from "./_app.js";

export default app;
