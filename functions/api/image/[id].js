import { makeSvg } from "../../../src/generator.js";

export async function onRequest({ params }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id < 1 || id > 10000) {
    return new Response("Token ID must be between 1 and 10000", { status: 404 });
  }

  return new Response(makeSvg(id), {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=31536000, immutable",
      "access-control-allow-origin": "*",
      "x-content-type-options": "nosniff"
    }
  });
}
