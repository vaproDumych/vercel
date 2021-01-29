import addOrder from "../../middleware/models/addorder";
import Cors from 'cors';
import initMiddleware from '../../middleware/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req, res) {
  // Run cors
  await cors(req, res)

  let orderId = JSON.parse(req.body);
  if (orderId.order) {
    await addOrder(JSON.parse(req.body)).then((data) => {
      res.status(200);
      //res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      //res.setHeader("Access-Control-Allow-Headers", "Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      res.status(200).json(data);
      // res.end(JSON.stringify(data));
      // res.json(data);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({ status: 'body null' });
      });
  }

}
