import { MongoClient } from "mongodb";

if (!process.env.DATABASE_URL) {
  throw new Error("MONGODB Connection is not defined in .env");
}
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(process.env.DATABASE_URL);
clientPromise = client.connect();

export default clientPromise;

export async function getDB(database = "usermanagement") {
  const client = await clientPromise;
  const db = client.db(database);
  return db;
}
