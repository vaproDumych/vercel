import updateOrder from "../../middleware/models/updateorder";
import Cors from 'cors';
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}



export default async function handler(req, res) {
  const values = {
    $set: {
      realization: JSON.parse(req.body).realization,
      transfer: JSON.parse(req.body).transfer,
      price: JSON.parse(req.body).price,
      payment: JSON.parse(req.body).payment,
      comment: JSON.parse(req.body).comment,
      checked: JSON.parse(req.body).checked,
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
