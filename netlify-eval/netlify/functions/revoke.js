const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const store = getStore("revocation-store");

  // Write a revoked token ID
  await store.set("token_abc123", JSON.stringify({ revoked: true, timestamp: Date.now() }));

  // Immediately read it back
  const data = await store.get("token_abc123");

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true, storedRecord: JSON.parse(data) }),
  };
};