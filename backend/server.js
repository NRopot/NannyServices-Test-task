import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3000;
const PAGINATION_TOTAL_ITEMS_KEY = 'PAGINATION_TOTAL_ITEMS';

app.use(
  cors({
    exposedHeaders: [PAGINATION_TOTAL_ITEMS_KEY],
  })
);
app.use(express.json());

const USERS = [
  {
    id: 'd6448195-f6b1-4754-88f6-47bc72b649cf',
    firstName: 'admin',
    username: 'admin',
    password: 'admin',
    role: 'Admin',
  },
  {
    id: 'b58ffff9-95cc-4a30-9af3-61f69af20eb5',
    firstName: 'Mikalai',
    lastName: 'Ropat',
    username: 'MicoLa',
    password: '1234',
    address: '221B Baker Street, Apt 3, New York, NY 10001, USA',
    photoUrl:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'Customer',
  },
  {
    id: '0efab381-6f75-4eee-b9ea-eb5959800603',
    firstName: 'Mikalai',
    lastName: 'Ropat',
    username: 'mikalai',
    password: '0000',
    address: '221B Baker Street, Apt 3, New York, NY 10001, USA',
    photoUrl:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'Customer',
  },
  {
    id: '0d6900cb-a8fb-4f43-a4c2-7b979e5cbea1',
    firstName: 'Mikalai',
    lastName: 'Ropat',
    username: 'Mikalai',
    password: '1111',
    address: '221B Baker Street, Apt 3, New York, NY 10001, USA',
    photoUrl:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'Customer',
  },
  {
    id: '0d6900cb-a8fb-4f43-a4c2-7b979e5cbea2',
    firstName: 'Mikalai',
    lastName: 'Ropat',
    username: 'Mikalai',
    password: '1111',
    address: '221B Baker Street, Apt 3, New York, NY 10001, USA',
    photoUrl:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'Customer',
  },
  {
    id: '0d6900cb-a8fb-4f43-a4c1-6b979e5cbea6',
    firstName: 'Mikalai',
    lastName: 'Ropat',
    username: 'Mikalai',
    password: '1111',
    address: '221B Baker Street, Apt 3, New York, NY 10001, USA',
    photoUrl:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'Customer',
  },
  {
    id: '0d6900cb-a8fb-4f43-a4c2-7b969e5cbea6',
    firstName: 'Mikalai',
    lastName: 'Ropat',
    username: 'Mikalai',
    password: '1111',
    address: '221B Baker Street, Apt 3, New York, NY 10001, USA',
    photoUrl:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'Customer',
  },
  {
    id: '0d6900cb-a8fb-4f43-a4c2-7b978e5cbea6',
    firstName: 'Mikalai',
    lastName: 'Ropat',
    username: 'Mikalai',
    password: '1111',
    address: '221B Baker Street, Apt 3, New York, NY 10001, USA',
    photoUrl:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'Customer',
  },
  {
    id: '0d6900cb-a8fb-4f43-a4c2-7b972e5cbea6',
    firstName: 'Mikalai',
    lastName: 'Ropat',
    username: 'Mikalai',
    password: '1111',
    address: '221B Baker Street, Apt 3, New York, NY 10001, USA',
    photoUrl:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'Customer',
  },
  {
    id: '0d6700cb-a8fb-4f43-a4c2-7b972e5cbea6',
    firstName: 'Mikalai',
    lastName: 'Ropat',
    username: 'Mikalai',
    password: '1111',
    address: '221B Baker Street, Apt 3, New York, NY 10001, USA',
    photoUrl:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'Customer',
  },
  {
    id: '0d6200cb-a8fb-4f43-a4c2-7b972e5cbea6',
    firstName: 'Mikalai',
    lastName: 'Ropat',
    username: 'Mikalai',
    password: '1111',
    address: '221B Baker Street, Apt 3, New York, NY 10001, USA',
    photoUrl:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    role: 'Customer',
  },
];
const PRODUCTS = [
  {
    id: 'a010d6a0-2997-4c47-a66d-d1f217d238cd',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: 'dbf9daa1-0752-46b6-9547-85a082c3f81c',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: 'e013cada-9a5b-4f23-8a6f-c3fad1a052a3',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: '89b3adaf-7812-487e-a33e-d13dfd30d32c',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: 'dbd0ed12-ca8d-437f-9309-e8212562cbb0',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: 'd5ca672f-df3b-4f84-8b55-969c635381ac',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: '1063f12f-548c-43b8-b765-54ea5fc0668c',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: '3c638b36-a3bc-48e0-8b7c-af405fc7c6d6',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: '17db7ef8-44b2-4d1a-965c-57a6cb2f0099',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: 'fe8cd244-688c-4362-ae1d-47870686e1b4',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: '3c6db09c-26e3-4694-923b-67cdb77b0d57',
    name: 'product_1',
    price: 10.01,
  },
  {
    id: '3c6db09c-26e3-4694-923b-67cdb77b0d57',
    name: 'product_1',
    price: 10.01,
  },
];

let orders = [
  {
    id: '1',
    customerId: '1',
    customerName: 'John Doe',
    items: [
      { productId: '1', productName: 'Laptop', quantity: 1, price: 999.99 },
      { productId: '4', productName: 'Headphones', quantity: 1, price: 149.99 },
    ],
    total: 1149.98,
    status: 'completed',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    customerId: '2',
    customerName: 'Jane Smith',
    items: [{ productId: '2', productName: 'Smartphone', quantity: 2, price: 499.99 }],
    total: 999.98,
    status: 'pending',
    createdAt: '2024-01-16T14:20:00Z',
  },
];

app.get('/api/users', (req, res) => {
  const { pageIndex, pageSize } = req.query;
  const endIndex = Number(pageSize) * (Number(pageIndex) + 1);
  const startIndex = Number(endIndex) - Number(pageSize);

  const customersCount = USERS.filter((user) => user.role === 'Customer').length;

  res.setHeader(PAGINATION_TOTAL_ITEMS_KEY, customersCount);
  res.json(USERS.slice(startIndex, endIndex));
});
app.get('/api/allUsers', (req, res) => {
  res.setHeader(PAGINATION_TOTAL_ITEMS_KEY, USERS.length);

  res.json(USERS);
});

app.get('/api/users/:id', (req, res) => {
  const user = USERS.find((c) => c.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { id, firstName, username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const newUser = {
    // id: uuidv4(),
    id,
    firstName,
    username,
    password,
    role,
  };

  USERS.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const userIndex = USERS.findIndex((c) => c.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  USERS[userIndex] = { ...USERS[userIndex], ...req.body };
  res.json(USERS[userIndex]);
});

app.delete('/api/users/:id', (req, res) => {
  const userIndex = USERS.findIndex((c) => c.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  USERS.splice(userIndex, 1);
  res.status(204).send();
});

app.get('/api/products', (req, res) => {
  res.json(PRODUCTS);
});

app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, price, category, stock = 0 } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Name, price and category are required' });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    price: parseFloat(price),
    category,
    stock: parseInt(stock),
  };

  PRODUCTS.push(newProduct);
  res.status(201).json(newProduct);
});

app.get('/api/orders', (req, res) => {
  const { status, customerId } = req.query;

  let filteredOrders = [...orders];

  if (status) {
    filteredOrders = filteredOrders.filter((o) => o.status === status);
  }

  if (customerId) {
    filteredOrders = filteredOrders.filter((o) => o.customerId === customerId);
  }

  res.json(filteredOrders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.post('/api/orders', (req, res) => {
  const { customerId, items } = req.body;

  if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Customer ID and items are required' });
  }

  const customer = USERS.find((c) => c.id === customerId);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  let total = 0;
  const orderItems = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return res.status(404).json({ error: `Product ${item.productId} not found` });
    }

    if (product.stock < item.quantity) {
      return res.status(400).json({ error: `Not enough stock for ${product.name}` });
    }

    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    orderItems.push({
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      price: product.price,
    });
  }

  const newOrder = {
    id: uuidv4(),
    customerId,
    customerName: customer.name,
    items: orderItems,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.listen(PORT, () => {
  console.log('Server listening ');
});
