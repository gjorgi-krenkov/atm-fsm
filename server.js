import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json());

const port = 3000

let authorized = false;
app.locals.balance = '1000';

app.use(cors())


app.get('/', (req, res) => {
  return res.send('Hello World!')
})

app.post('/authorize', async (req, res) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(3000);
  if(req.body.userId === '0000'){
    authorized = true;
    return res.send({
      authorized: true
    })
  }
  return res.sendStatus(403);
})

app.post('/checkBalance', (req, res) => {
  if(!authorized) res.sendStatus(403);
  return res.send({ balance: app.locals.balance });
})

app.post('/deposit', async (req, res) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(3000);

  if(!authorized) res.sendStatus(403);
  console.log(app.locals, req);
  app.locals.balance = (Number.parseInt(app.locals.balance) + Number.parseInt(req.body.depositAmount)).toString();
  return res.sendStatus(200);
})

app.post('/withdraw', async (req, res) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(3000);

  if(!authorized) res.sendStatus(403);
  const newBalance = Number.parseInt(app.locals.balance) - Number.parseInt(req.body.withdrawAmount);
  if(newBalance < 0) {
    res.sendStatus(400);
    return res.send();
  }
  app.locals.balance = newBalance.toString();
  return res.sendStatus(200);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})