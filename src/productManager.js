import fs from 'fs'

export default class ProductManager {
    constructor() {
        this.path = './products.json';
        this.products = [];
        this.Id = 1;
        this.loadProducts();
    }

    addProduct(producto) {
        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
            throw new Error('Todos los campos son obligatorios.');
            
        }

        const verificacionProd = this.products.find(productoExistente => productoExistente.code === producto.code);
        if (verificacionProd) {
            throw new Error('El campo "code" ya existe.');
        }

        const productoNuevo = {
            id: this.Id,
            ...producto,
        };

        this.products.push(productoNuevo);
        this.Id++;

        this.saveProducts();
        console.log('Producto agregado correctamente.');
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const producto = this.products.find(productoExistente => productoExistente.id === id);
        if (producto) {
            return producto;
        } else {
            console.log('Producto no encontrado.');
        }
    }

    async updateProduct(id, dataToUpdate) {
        const actProduct = this.products.find(product => product.id === id);

        if (actProduct) {
            if (dataToUpdate.title) actProduct.title = dataToUpdate.title;
            if (dataToUpdate.description) actProduct.description = dataToUpdate.description;
            if (dataToUpdate.price) actProduct.price = dataToUpdate.price;
            if (dataToUpdate.thumbnail) actProduct.thumbnail = dataToUpdate.thumbnail;
            if (dataToUpdate.code) actProduct.code = dataToUpdate.code;
            if (dataToUpdate.stock) actProduct.stock = dataToUpdate.stock;
        } else {
            console.log(`No se encontró un producto con ID ${id}. No se pudo actualizar.`);
        }

        await this.saveProducts();
        console.log('Producto actualizado', actProduct);
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(productoExistente => productoExistente.id === id);
        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            await this.saveProducts();
            console.log('Producto eliminado correctamente.');
        } else {
            console.log('Producto no encontrado.');
        }
    }

    async loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                const lastProductId = this.products[this.products.length - 1].id;
                this.Id = lastProductId + 1;
            }
        } catch (error){}
    }

    async saveProducts() {
        await fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }
}

const product = new ProductManager();

/* product.addProduct({
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
})

product.addProduct({
    title: 'Fernet',
    description: 'Bebida Alcoholica',
    price: 3500,
    thumbnail: 'fernesuli',
    code: 123456,
    stock: 120
}); 
console.log(product.getProducts()) 

product.updateProduct(1, {
    title: 'Coca Cola',
    description: 'Bebida',
    price: 1400,
    thumbnail: 'lalala',
    code: 1234,
    stock: 120
}) */

/* product.addProduct({
    title: 'Baggio',
    description: 'Bebida',
    price: 1200,
    thumbnail: 'juguito.jpg',
    code: 1234567,
    stock: 120
}); 
product.addProduct({
    title: 'tomate',
    description: 'verdura',
    price: 1500,
    thumbnail: 'tomatito.jpg',
    code: 12345678,
    stock: 120
}); */



//product.deleteProduct(2);
