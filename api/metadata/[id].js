import { makeMetadata } from "../../src/generator.js";

export default function handler(req, res) {
  const id = Number(req.query.id);
  if (!Number.isInteger(id) || id < 1 || id > 10000) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(404).end(JSON.stringify({ error: "Token ID must be between 1 and 10000" }));
  }
  const forwardedProto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const origin = `${forwardedProto}://${host}`;
  const metadata = makeMetadata(id, origin);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.status(200).end(JSON.stringify(metadata));
}
