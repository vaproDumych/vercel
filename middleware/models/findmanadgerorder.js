import { connectToDatabase } from "../mongodb";

export default async function findOrdersQuery(query) {
  const { db } = await connectToDatabase();
  const orders = await db.collection("tdes").find(query).toArray();
  return orders;
}