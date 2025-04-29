const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const products = require('./data/products.json');

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
