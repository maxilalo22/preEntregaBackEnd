import fs from 'fs'
class ProductManager {
    constructor() {
        this.products = [];
        this.id = 1;
        this.path = './products.json';
    }

    generarId() {
        return this.id++;
    }

    archivoProducts() {
        try {
            fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.log('Error al escribir el archivo de productos', error);
        }
    }

    async leerProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            console.log('Productos cargados desde el archivo JSON:');
            console.log(this.products);
        } catch (error) {
            console.log('No se encontró el archivo de productos.');
        }
    }


    addProduct({ title, description, price, thumbnail, code, stock }) {
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
        if (codigoExistente) throw new Error('El código de producto ya existe')

        this.products.push(product);
        this.archivoProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const idProduct = this.products.find(product => product.id === id);
        if (!idProduct) throw new Error(`ID Not Found!`);
        return idProduct;
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

        this.archivoProducts();
        console.log('Producto actualizado', actProduct);
    }

    async deleteProduct(id) {
        const borrarProduct = this.products.find(product => product.id === id);

        if (borrarProduct) {
            const borrarProductIndex = this.products.indexOf(borrarProduct);
            this.products.splice(borrarProductIndex, 1);

            try {
                await this.archivoProducts();
                console.log(`Producto con ID ${id} eliminado.`);
            } catch (error) {
                console.log('Error al eliminar el producto', error);
            }
        } else {
            console.log(`No se encontró un producto con ID ${id}. No se pudo eliminar.`);
        }
    }


}

const product = new ProductManager();

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
})




product.deleteProduct(2);




//console.log(product.getProductById(2))

