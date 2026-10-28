import { makeMetadata } from "../../../src/generator.js";

export async function onRequest({ params, request }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id < 1 || id > 10000) {
    return new Response(JSON.stringify({ error: "Token ID must be between 1 and 10000" }), {
      status: 404,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=3600" }
    });
  }

  const origin = new URL(request.url).origin;
  const metadata = makeMetadata(id, origin);
  return new Response(JSON.stringify(metadata), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=31536000, immutable",
      "access-control-allow-origin": "*"
    }
  });
}
