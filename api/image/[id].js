import { makeSvg } from "../../src/generator.js";

export default function handler(req, res) {
  const id = Number(req.query.id);
  if (!Number.isInteger(id) || id < 1 || id > 10000) {
    res.status(404).setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Token ID must be between 1 and 10000");
  }
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("X-Content-Type-Options", "nosniff");
  return res.status(200).end(makeSvg(id));
}
