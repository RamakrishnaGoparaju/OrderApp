import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

interface Order {
  customerName: string;
  email: string;
  mobileNumber: string;
  address: string;
  products: { name: string; quantity: number; price: number }[];
}

let orders: Order[] = [];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ token: 'dummy-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/order', (req, res) => {
  const order: Order = req.body;
  orders.push(order);
  res.json({ message: 'Order received', order });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
