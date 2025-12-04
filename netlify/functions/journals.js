import { MongoClient } from "mongodb";

const buildResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  },
  body: JSON.stringify(body),
});

const parseJson = (value) => {
  try {
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
};

const getMongoUri = () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable for journals function");
  }
  return uri;
};

export default async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return buildResponse(200, { ok: true });
  }

  let client;
  try {
    const uri = getMongoUri();
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db("kizuna");
    const journals = db.collection("journals");

    // LIST ENTRIES
    if (event.httpMethod === "GET") {
      const userId = event.queryStringParameters?.userId;
      const list = await journals.find({ userId }).toArray();
      return buildResponse(200, list);
    }

    // CREATE ENTRY
    if (event.httpMethod === "POST") {
      const body = parseJson(event.body);
      const entry = {
        userId: body.userId,
        content: body.content,
        emotion: body.emotion,
        date: body.date || new Date().toISOString(),
      };

      const result = await journals.insertOne(entry);

      return buildResponse(200, {
        id: result.insertedId,
        ...entry,
      });
    }

    return buildResponse(404, { error: "Not found" });
  } catch (error) {
    return buildResponse(500, { error: error.message || "Unexpected error" });
  } finally {
    if (client) {
      await client.close().catch(() => undefined);
    }
  }
}
