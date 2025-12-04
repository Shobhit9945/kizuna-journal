import { MongoClient } from "mongodb";

const uri = "mongodb+srv://shobhit:shobhit21@kizuna.mfwaudu.mongodb.net/kizuna";

export default async function handler(req, res) {
  const path = req.url.replace("/.netlify/functions/auth", "");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("kizuna");
  const users = db.collection("users");

  // SIGN UP
  if (path === "/signup" && req.method === "POST") {
    const body = await req.json();

    const newUser = {
      email: body.email,
      password: body.password,
      role: body.role || "student",
      fullName: body.fullName || "",
      studentId: body.studentId || null,
    };

    const result = await users.insertOne(newUser);

    return res.status(200).json({
      id: result.insertedId,
      user: { ...newUser, id: result.insertedId },
      token: String(result.insertedId),
    });
  }

  // SIGN IN
  if (path === "/signin" && req.method === "POST") {
    const body = await req.json();
    const user = await users.findOne({
      email: body.email,
      password: body.password,
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({
      user: { ...user, id: user._id },
      token: String(user._id),
    });
  }

  // SIGN OUT
  if (path === "/signout" && req.method === "POST") {
    return res.status(200).json({ message: "Signed out" });
  }

  return res.status(404).json({ error: "Not found" });
}
