import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const store = getStore("revocation-store");

  // Write test token
  await store.set("token_abc123", JSON.stringify({ revoked: true, timestamp: Date.now() }));

  // Read it back
  const data = await store.get("token_abc123");

  return Response.json({
    success: true,
    storedRecord: JSON.parse(data),
  });
};
