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
    throw new Error("Missing MONGODB_URI environment variable for auth function");
  }
  return uri;
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return buildResponse(200, { ok: true });
  }

  let client;
  try {
    const uri = getMongoUri();
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db("kizuna");
    const users = db.collection("users");

    const path = (event.path || "").replace("/.netlify/functions/auth", "") || "/";

    // SIGN UP
    if (path === "/signup" && event.httpMethod === "POST") {
      const body = parseJson(event.body);

      const newUser = {
        email: body.email,
        password: body.password,
        role: body.role || "student",
        fullName: body.fullName || "",
        studentId: body.studentId || null,
      };

      const result = await users.insertOne(newUser);

      return buildResponse(200, {
        id: result.insertedId,
        user: { ...newUser, id: result.insertedId },
        token: String(result.insertedId),
      });
    }

    // SIGN IN
    if (path === "/signin" && event.httpMethod === "POST") {
      const body = parseJson(event.body);
      const user = await users.findOne({
        email: body.email,
        password: body.password,
      });

      if (!user) {
        return buildResponse(401, { error: "Invalid credentials" });
      }

      return buildResponse(200, {
        user: { ...user, id: user._id },
        token: String(user._id),
      });
    }

    // SIGN OUT
    if (path === "/signout" && event.httpMethod === "POST") {
      return buildResponse(200, { message: "Signed out" });
    }

    return buildResponse(404, { error: "Not found" });
  } catch (error) {
    return buildResponse(500, { error: error.message || "Unexpected error" });
  } finally {
    if (client) {
      await client.close().catch(() => undefined);
    }
  }
};
