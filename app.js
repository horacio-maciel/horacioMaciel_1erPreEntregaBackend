const express = require('express')
const app = express()

const ProductManager = require("./ProductManager")

const productManager = new ProductManager("Products.json");

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || null;
        const products = await productManager.getProducts();

        if (limit !== null) {
            res.json({ products: products.slice(0, limit) });
        } else {
            res.json({ products });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products/:pid', async (req, res) => {
        const product = await productManager.getProductById(
          parseInt(req.params.pid));
        
        if (product) {
            res.json({ product });
        } else {
          res.json({ message: 'el id del producto no fue encontrado' });
        }
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
