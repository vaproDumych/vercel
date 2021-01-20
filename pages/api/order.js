import findOrder from "../../middleware/models/order";

export default async function handler(req, res) {
  let o_id = req.headers.referer.split("/")[
    req.headers.referer.split("/").length - 1
  ];

  await findOrder(o_id).then((order) => {
    res.send(order);
  });
}
