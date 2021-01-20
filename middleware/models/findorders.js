import { connectToDatabase } from "../mongodb";

export default async function findOrders() {
  const { db } = await connectToDatabase();
  const orders = await db.collection("tdes").find({}).toArray();
  return orders;
}