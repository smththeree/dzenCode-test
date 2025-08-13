import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());


const JWT_SECRET = 'supersecretkey';


const users = [
  {
    id: 1,
    username: 'admin',
    passwordHash: bcrypt.hashSync('admin', 8)
  }
];


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const validPass = bcrypt.compareSync(password, user.passwordHash);
  if (!validPass) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});


const products = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile1.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 },
    ],
    order: 1,
    date: '2017-06-29 12:09:33',
  },
  {
    id: 2,
    serialNumber: 5678,
    isNew: 0,
    photo: 'pathToFile2.jpg',
    title: 'Product 2',
    type: 'Laptops',
    specification: 'Specification 2',
    guarantee: {
      start: '2018-01-10 10:00:00',
      end: '2019-01-10 10:00:00',
    },
    price: [
      { value: 10, symbol: 'USD', isDefault: 0 },
      { value: 420, symbol: 'UAH', isDefault: 1 },
    ],
    order: 1,
    date: '2018-01-10 10:00:00',
  },
  {
    id: 3,
    serialNumber: 9012,
    isNew: 1,
    photo: 'pathToFile3.jpg',
    title: 'Product 3',
    type: 'Monitors',
    specification: 'Specification 3',
    guarantee: {
      start: '2019-05-15 09:30:00',
      end: '2020-05-15 09:30:00',
    },
    price: [
      { value: 50, symbol: 'USD', isDefault: 0 },
      { value: 2100, symbol: 'UAH', isDefault: 1 },
    ],
    order: 2,
    date: '2019-05-15 09:30:00',
  },
  {
    id: 4,
    serialNumber: 3456,
    isNew: 0,
    photo: 'pathToFile4.jpg',
    title: 'Product 4',
    type: 'Laptops',
    specification: 'Specification 4',
    guarantee: {
      start: '2020-01-01 00:00:00',
      end: '2021-01-01 00:00:00',
    },
    price: [
      { value: 20, symbol: 'USD', isDefault: 0 },
      { value: 840, symbol: 'UAH', isDefault: 1 },
    ],
    order: 3,
    date: '2020-01-01 00:00:00',
  },
];

const orders = [
  {
    id: 1,
    title: 'Order 1',
    date: '2017-06-29 12:09:33',
    description: 'First order description',
    get products() {
      return products.filter(p => p.order === this.id);
    },
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2019-05-15 09:30:00',
    description: 'Second order description',
    get products() {
      return products.filter(p => p.order === this.id);
    },
  },
  {
    id: 3,
    title: 'Order 3',
    date: '2020-01-01 00:00:00',
    description: 'Third order description',
    get products() {
      return products.filter(p => p.order === this.id);
    },
  },
];

app.post('/orders', authenticateToken, (req, res) => {
  const { title, description, products: orderProducts } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }


  const newOrderId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;


  const newOrder = {
    id: newOrderId,
    title,
    date: new Date().toISOString(),
    description: description || '',
    get products() {
      return products.filter(p => p.order === this.id);
    },
  };

  orders.push(newOrder);


  if (Array.isArray(orderProducts) && orderProducts.length > 0) {
    orderProducts.forEach(prod => {
      const newProductId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

      products.push({
        id: newProductId,
        ...prod,
        order: newOrderId,
        date: new Date().toISOString(),
      });
    });
  }

  res.status(201).json({
    message: 'Order created successfully',
    order: {
      id: newOrder.id,
      title: newOrder.title,
      date: newOrder.date,
      description: newOrder.description,
      products: newOrder.products,
    },
  });
});
app.get('/orders', authenticateToken, (req, res) => {
  const result = orders.map(o => ({
    id: o.id,
    title: o.title,
    date: o.date,
    description: o.description,
    products: o.products
  }));
  res.json(result);
});
app.delete('/orders/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id, 10);

  const orderIndex = orders.findIndex(o => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }


  orders.splice(orderIndex, 1);


  for (let i = products.length - 1; i >= 0; i--) {
    if (products[i].order === id) {
      products.splice(i, 1);
    }
  }

  res.json({ message: `Order ${id} and related products deleted` });
});



app.delete('/products/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id, 10);

  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(productIndex, 1);

  res.json({ message: `Product ${id} deleted` });
});

app.get('/products', authenticateToken, (req, res) => {
  res.json(products);
});

let activeSessions = 0;

io.on('connection', (socket) => {
  activeSessions++;
  io.emit('activeSessions', activeSessions);

  socket.on('disconnect', () => {
    activeSessions--;
    io.emit('activeSessions', activeSessions);
  });
});

app.get('/datetime', (req, res) => {
  res.json({ datetime: new Date().toISOString() });
});

const PORT = 4444;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});