import { connectToDatabase } from "../mongodb";

export default async function addOrder(order) {
  const { db } = await connectToDatabase();

  const resultData = await db
    .collection("tdes")
    .insertOne(order, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      console.log(res.result);
      return res.result;
    });
  // const orders = await db.collection("tdes").find({}).limit(20).toArray();
  // return orders;
  return `success`;
}
