import { connectToDatabase } from "../mongodb";
const ObjectId = require("mongodb").ObjectID;

export default async function findOrder(orderId) {
  const { db } = await connectToDatabase();
  const order = await db
    .collection("tdes")
    .find({ _id: ObjectId(orderId) })
    .toArray();
  return order;
}
