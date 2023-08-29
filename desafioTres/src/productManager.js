// const http = require("http");



// const server = http.createServer((req, res)=>{
//     res.end("Hola Mundo!!!!")
// })


// server.listen(8080, () => {
//     console.log("Escuchando 8080")
// })

import { promises as fs } from "fs"

export default class ProductManager {
    constructor() {
        this.path = "../products.txt"
        this.products = []

    }

    static id = 0

    addProduct = async (title, description, price, thumbmail, code, stock) => {
        try {
            ProductManager.id++
            let newProduct = { title, description, price, thumbmail, code, stock, id: ProductManager.id }
            this.products = await this.getProducts()
            this.products.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(this.products))
        }
        catch (err) {
            console.log(`addProduct fails`)
            return true
        }
    }

    
    readProducts = async () => {
        let respuesta = await (fs.readFile(this.path, "utf-8"))
        return JSON.parse(respuesta)
    }


    getProducts = async () => {
        try {
            let products = await fs.readFile(this.path, "utf-8")
            return JSON.parse(products)
        }
        catch (err) {
            console.log(`getProducts fails`)
            return []
        }
    }

    getProductsById = async (id) => {
        try {
            let respId = await this.readProducts();
            if (!respId.find(product => product.id === id)) {
                return("Not Found")
            } else {
                return(respId.find(product => product.id === id))
            }
        }
        catch (err) {
            console.log(`getProductsById fails`)
            return false
        }
    }

    updateProduct = async ({ id, title, description, price, thumbmail, code, stock }) => {
        try {
            if (!title || !description || !price || !thumbmail || !code || !stock) {
                console.log('Todos los campos son requeridos para actualizar un producto.')
                return;
            }

            await this.deleteProduct(id);
            let productsBefore = await this.readProducts()
            let modifiedProduct = [{ id, title, description, price, thumbmail, code, stock }, ...productsBefore];
            await fs.writeFile(this.path, JSON.stringify(modifiedProduct))
        }
        catch (err) {
            console.log(`updateProduct fails`)
            return false
        }
    }

    deleteProduct = async (id) => {
        try {
            let respDelete = await this.readProducts();
            let filterDelete = respDelete.filter(products => products.id != id)
            await fs.writeFile(this.path, JSON.stringify(filterDelete))
            return true
        }
        catch (err) {
            console.log(`deleteProduct fails`)
            return false
        }
    }
}



const product = new ProductManager;