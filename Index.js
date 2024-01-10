const ProductManager = require('./ProductManager');

const producto = new ProductManager('./Products.json');

producto.addProduct('alianzas', 'anillos de oro 4gr', 200, 'img', 'code-2020', 10);
producto.addProduct('cadenas de plata', 'cadenas de plata 925', 50, 'img', 'code-2021', 10);
producto.addProduct('cadenas de oro', 'cadenas de plata de 10gr', 200, 'img', 'code-2022', 10);
producto.addProduct('pulceras de plata', 'pulceras de plata 925', 50, 'img', 'code-2023', 10);
producto.addProduct('pulceras de oro', 'pulceras de oro 5gr', 200, 'img', 'code-2024', 10);

console.log(producto.getProducts());

producto.getProductById(1);

producto.updateProduct(2, { stock: 10 });

producto.deleteProduct(3);


console.log(producto.getProducts());