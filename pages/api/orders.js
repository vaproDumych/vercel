import findOrders from "../../middleware/models/findorders";

export default async function handler(req, res) {
  await findOrders().then((orders) => {
    res.send(orders);
    console.log(orders);
  });
}
