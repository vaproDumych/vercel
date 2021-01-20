import findOrders from "../../middleware/models/findorders";
import findOrdersQuery from "../../middleware/models/findmanadgerorder.js";
export default async function handler(req, res) {
  console.log(JSON.parse(req.body))
  console.log('///////////////////////////////////////////////')
  if (JSON.parse(req.body) == 'Гук Василь') {
    await findOrders().then((orders) => {
      res.send(orders);
      console.log(orders);
    });  
  } else {
    await findOrdersQuery({ manager: JSON.parse(req.body) }).then((orders) => {
      res.send(orders);
      console.log(orders);
    });
  }
  
}
