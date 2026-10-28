# AGENT GENESIS — Dynamic NFT Artwork Generator (No IPFS)

This starter generates artwork and JSON metadata deterministically from a token ID.
It does **not** require 10,000 separate image files or 10,000 separate JSON files.

## What this package does
- `/api/metadata/1` returns JSON metadata for token 1.
- `/api/image/1` returns the SVG artwork for token 1.
- Each token ID always produces the same art and traits.
- Uses Cloudflare Pages Functions; no IPFS is involved.

## Important before mainnet
This is a **starter/prototype**, not a deployed NFT project or audited contract.
You still need to deploy the website, configure the contract's `tokenURI` / base URI,
test with your target marketplace and Binance Agentic Wallet, and test on BNB Chain testnet.
A website/API host can change or go offline; without IPFS, the artwork is not decentralized
or guaranteed permanent.

## Deploy to Cloudflare Pages
1. Create a Git repository and upload the contents of this folder.
2. In Cloudflare, create a Pages project connected to that repository.
3. In build settings, leave the build command blank and set the build output directory to `public`.
   Keep the `functions` and `src` folders at the repository root; do not move them into `public`.
4. Deploy.
5. Test:
   - `https://YOUR-SITE.pages.dev/api/metadata/1`
   - `https://YOUR-SITE.pages.dev/api/image/1`
6. The metadata response should contain an `image` URL that opens the SVG.
7. Set your contract's metadata base URI to:
   `https://YOUR-SITE.pages.dev/api/metadata/`
   This assumes the contract appends the token ID without `.json`.
   If your chosen ERC-721 contract appends `.json`, change the routes or base URI to match.

## Design and rarity
The generator assigns traits deterministically from the token ID. It includes 10,000 possible IDs.
The rarity bands are assigned by token ID range: 1 Genesis, 2–100 Legendary, 101–500 Epic,
501–1500 Rare, 1501–4000 Uncommon, and 4001–10000 Common. This guarantees those counts
but makes rarity correlate with token ID order. If desired, randomize the mint-to-token assignment
or use a secure reveal design before launch.

## Security and marketplace notes
- Never assume Binance endorses or has integrated this project.
- Confirm whether your chosen marketplace displays SVG metadata and external HTTPS URLs.
- Do not advertise "permanent" artwork while it is hosted on a conventional website.
- The mint contract must enforce supply, free first mint, payment, and five lifetime mints per wallet.
- The API is not the source of truth for ownership or mint limits; those belong in the contract.
