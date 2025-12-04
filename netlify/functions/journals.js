import { MongoClient } from "mongodb";

const uri = "mongodb+srv://shobhit:shobhit21@kizuna.mfwaudu.mongodb.net/kizuna";

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("kizuna");
  const journals = db.collection("journals");

  // LIST ENTRIES
  if (req.method === "GET") {
    const url = new URL(req.url, "http://localhost");
    const userId = url.searchParams.get("userId");

    const list = await journals.find({ userId }).toArray();
    return res.status(200).json(list);
  }

  // CREATE ENTRY
  if (req.method === "POST") {
    const body = await req.json();
    const entry = {
      userId: body.userId,
      content: body.content,
      emotion: body.emotion,
      date: body.date || new Date().toISOString(),
    };

    const result = await journals.insertOne(entry);

    return res.status(200).json({
      id: result.insertedId,
      ...entry,
    });
  }

  return res.status(404).json({ error: "Not found" });
}
