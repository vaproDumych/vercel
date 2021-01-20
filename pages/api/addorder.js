import addOrder from "../../middleware/models/addorder";
export default async function handler(req, res) {
  console.log(req.body);
  await addOrder(JSON.parse(req.body)).then((data) => {
    res.status(200);
    res.end(JSON.stringify(data));
    rew.write(data);
    res.send(data);
  });
}
