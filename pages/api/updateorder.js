import updateOrder from "../../middleware/models/updateorder";

export default async function handler(req, res) {
  const values = {
    $set: {
      realization: JSON.parse(req.body).realization,
      transfer: JSON.parse(req.body).transfer,
      price: JSON.parse(req.body).price,
      payment: JSON.parse(req.body).payment,
      comment: JSON.parse(req.body).comment,
    },
  };
  let o_id = req.headers.referer.split("/")[
    req.headers.referer.split("/").length - 1
  ];
  console.log("from updateorder api" + o_id);
  console.log("from updateorder " + values);
  await updateOrder(o_id, values).then((order) => {
    res.send({ order: "success" });
  });
}
