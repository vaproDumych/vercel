import addOrder from "../../middleware/models/addorder";
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


  // Run the middleware
  await runMiddleware(req, res, cors);

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
