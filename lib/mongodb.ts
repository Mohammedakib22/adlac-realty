import mongoose from "mongoose";

type Cached = { connection: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const globalMongo = globalThis as typeof globalThis & { aldacMongo?: Cached };
const cache = globalMongo.aldacMongo ?? { connection: null, promise: null };
globalMongo.aldacMongo = cache;

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured.");
  if (cache.connection) return cache.connection;
  cache.promise ??= mongoose.connect(uri, { bufferCommands: false });
  try { cache.connection = await cache.promise; }
  catch (error) { cache.promise = null; throw error; }
  return cache.connection;
}
