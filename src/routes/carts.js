const express = require('express');
const router = express.Router();
const CartManager = require('../cartManager');

const cartManager = new CartManager('carts.json');

// Ruta raíz POST /api/carts - Crear un nuevo carrito
router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  });


// Ruta raíz GET /api/carts - Listar todos los productos
router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const carts = await cartManager.getCarts(limit);
    res.json(carts);
  });

// Ruta GET /api/carts/:cid - Listar los productos que pertenezcan al carrito con el cid proporcionado
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await cartManager.getCartById(+cid);
      if (!cart) {
        res.status(404).json({ message: 'Carrito no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Productos en el carrito', products: cart.products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Ruta POST /api/carts/:cid/product/:pid - Agregar el producto al arreglo “products” del carrito seleccionado
router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
  
    try {
      const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
      if (updatedCart) {
        res.json(updatedCart);
      } else {
        res.status(404).json({ message: 'Cart or product not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;