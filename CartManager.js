const fs = require('fs');
const ProductManager = require('./ProductManager');
const productManager = new ProductManager('products.json');

class CartManager {
    constructor(filename) {
      this.filename = filename;
      this.carts = [];
      this.loadCarts();
    }

  async loadCarts() {
    try {
      const data = await fs.promises.readFile(this.filename, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      console.error('Error loading carts:', error);
    }
  }

  async saveCarts() {
    try {
      await fs.promises.writeFile(this.filename, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error('Error saving carts:', error);
    }
  }

  async createCart() {
    const newCart = {
      id: this.generateUniqueId(),
      products: [],
    };
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  async getCarts() {
    return this.carts;
}

  async getCartById(cid) {
    const cart = this.carts.find((c) => c.id === cid);
    return cart;
  }

  async addProductToCart(cid, pid, quantity) {
    const cart = await this.getCartById(cid);
    if (!cart) throw new Error('Cart not found');

    const product = await productManager.getProductById(pid);
    if (!product) throw new Error('Product not found');

    const productIndex = cart.products.findIndex((p) => p.product === pid);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await this.saveCarts();
    return cart;
  }

  generateUniqueId() {
    let id = Math.floor(Math.random() * 10);
    if (this.carts.some((c) => c.id === id)) {
      id = this.generateUniqueId();
    }
    return id;
  }
}

module.exports = CartManager;