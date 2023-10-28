
class ProductManager {
    constructor() {
        this.products = [];
        this.id = 1;
    }

    generarId() {
        return this.id++;
    }

    addProduct({title, description, price, thumbnail, code, stock }) {
        
        const product = {
            id: this.generarId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son requeridos!");
        }
        const codigoExistente = this.products.find(product => product.code === code)
        if(codigoExistente) throw new Error ('El código de producto ya existe')
        
        this.products.push(product)
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const idProduct = this.products.find(product => product.id === id)
        if(!idProduct) throw new Error (`ID Not Found!`)
        return idProduct
    }
}

const product = new ProductManager()

product.addProduct({
    title: 'Coca Cola',
    description: 'Bebida',
    price: 1200,
    thumbnail: 'lalala',
    code: 1234,
    stock: 120
});

product.addProduct({
    title: 'Fanta',
    description: 'Bebida',
    price: 1000,
    thumbnail: 'jajaja',
    code: 12345,
    stock: 120
});


console.log(product.getProducts())
console.log(product.getProductById(2))
