import { connectToDatabase } from "../mongodb";
const ObjectId = require("mongodb").ObjectID;

export default async function updateOrder(orderId, values) {
  const { db } = await connectToDatabase();
  let status = true;
  const order = await db
    .collection("tdes")
    .updateOne({ _id: ObjectId(orderId) }, values, function (err, res) {
      if (err) throw err;
      console.log(res.result.nModified);
      console.log(res.result);
      return { status: true };
    });
}
