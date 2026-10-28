# AGENT GENESIS — Vercel dynamic NFT generator

This version adapts the dynamic SVG image and JSON metadata endpoints to Vercel Node.js Functions.

## Routes
- `/` — preview page
- `/api/image/1` — SVG image for token 1 (valid IDs 1–10000)
- `/api/metadata/1` — JSON metadata for token 1

## Deploy on Vercel
1. Upload the `api/` folder, `src/`, `public/`, and `package.json` to the root of the existing GitHub repository.
2. The Vercel project settings should use Framework Preset `Other`, Root Directory `./`, Build Command blank, Output Directory `public`, Install Command blank.
3. Redeploy after the GitHub commit.
4. Test `/api/image/1` and `/api/metadata/1` on the deployed domain.

Important: this is only the dynamic art/metadata generator. It does not include a smart contract, minting site, wallet connection, or payment logic. Images and metadata are served from the website and are not decentralized/permanent storage. Verify all routes and metadata before deploying a contract that points to them.
