const express = require('express');
const app = express();
const routerProducts = require('./routes/products');
const routerCarts = require('./routes/carts');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

app.listen(8080, () => {
  console.log('Server running on port 8080');
});