import addOrder from "../../middleware/models/addorder";
export default async function handler(req, res) {
  let orderId = JSON.parse(req.body);
  if (orderId.order) {
    await addOrder(JSON.parse(req.body)).then((data) => {
      res.status(200);
      res.end(JSON.stringify(data));
      res.send(data);
    });
  } else {
    res.status(500);
    res.send({status: 'body null'});
  }

}
