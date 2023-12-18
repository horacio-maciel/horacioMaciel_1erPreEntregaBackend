class ProductManager {
    constructor(){
        this.products = [];
    }

    static id = 0;

    addProduct(title, description, price, thumbnail, code, stock){
        let codeRepeated = false;

        for(let i = 0; i < this.products.length; i++){
            if (this.products[i].code === code) {
                console.log(`El código ${code} está repetido`);
                codeRepeated = true;
                break;
            }
        }

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (!Object.values(newProduct).includes(undefined) && !codeRepeated){
            ProductManager.id++;
            this.products.push({
                ...newProduct,
                id: ProductManager.id,
            });
        } else {
            console.log("Todos los campos son requeridos o el código está repetido");
        }
    }

    getProduct(){
        return this.products;
    }

    existe(id) {
        return this.products.find((producto) => producto.id === id);
    }

    getProductById(id) {
        const product = this.existe(id);
        if (!product) {
            console.log("Producto no encontrado");
        } else {
            console.log(product);
        }
    }
}

const productos = new ProductManager();

productos.addProduct("title1", "description1", 500, "thumbnail1", "hm1991", 10);
productos.addProduct("title2", "description2", 200, "thumbnail2", "hm1991", 5);

console.log(productos.getProduct());

//
productos.getProductById(2);
productos.getProductById(5);
