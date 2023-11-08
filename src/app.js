import ProductManager from "./productManager.js";
import express from 'express'

const app = express()
const server = app.listen(8080, () => console.log('Servidor corriendo en puerto 8080!'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let productManager = new ProductManager();

app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit)
    if (!isNaN(limit)) {
        const limitesProd = productManager.getProducts().slice(0, limit)
        res.json(limitesProd)
    } else {
        res.send(productManager.getProducts());
    }
})

app.get('/products/:pid', (req,res)=>{
    let pid= req.params.pid;
    res.json(productManager.getProductById(parseInt(pid)));
})
