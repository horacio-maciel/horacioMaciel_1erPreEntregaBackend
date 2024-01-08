class ProductManager {

    id= 0; 
    products= []

    addProduct(description, price, stock){
        this.products.push({id: this.id, price, description,stock})
        this.id = this.id+1    
    }
    
    getAllProducts(){
        return this.products;
    }

}

module.exports = new ProductManager();