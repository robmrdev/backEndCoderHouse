import express  from "express"
import { promises as fs } from "fs"

class ProductManager {
    constructor() {
        this.path = "./products.txt"
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
                console.log("Not Found")
            } else {
                console.log(respId.find(product => product.id === id))
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



// PASO 1, AGREGAR PRODUCTOS

// await product.addProduct('Producto 1','Descripcion de producto 1',1500,'https://www.productos.com/producto1.png','a1a1a1a1a1',30)
// await product.addProduct('Producto 2','Descripcion de producto 2',3000,'https://www.productos.com/producto2.png','b2b2b2b2b2',30)
// await product.addProduct('Producto 3','Descripcion de producto 3',4000,'https://www.productos.com/producto3.png','c3c3c3c3c3',30)
// await product.addProduct('Producto 4','Descripcion de producto 4',1500,'https://www.productos.com/producto4.png','d4d4d4d4d4',30)
// await product.addProduct('Producto 5','Descripcion de producto 5',3000,'https://www.productos.com/producto5.png','e5e5e5e5e5',30)
// await product.addProduct('Producto 6','Descripcion de producto 6',4000,'https://www.productos.com/producto6.png','f6f6f6f6f6',30)
// await product.addProduct('Producto 7','Descripcion de producto 7',1500,'https://www.productos.com/producto7.png','g7g7g7g7g7',30)
// await product.addProduct('Producto 8','Descripcion de producto 8',3000,'https://www.productos.com/producto8.png','h8h8h8h8h8',30)
// await product.addProduct('Producto 9','Descripcion de producto 9',4000,'https://www.productos.com/producto9.png','i9i9i9i9i9',30)
// await product.addProduct('Producto 10','Descripcion de producto 10',4000,'https://www.productos.com/producto10.png','j10j10j10j10',30)




//PASO 2, Obtener los productos

// let products = await product.getProducts()
// console.log(products)




// PASO 3, Borrar productos

// let products = await product.getProducts()
// await product.deleteProduct(2)
// console.log(products)





//PASO 4, ACTUALIZAR DATOS DE UN PRODUCTO

// await product.updateProduct({
//     title: 'Producto 1 MOFIDICADO2',
//     description: 'Descripcion de producto 1 MODIFICADO',
//     price: 343434
//     thumbmail: 'https://www.productos.com/producto1.png',
//     code: 'a1a1a1a1a1',
//     stock: 30,
//     id: 1
// })

// let products = await product.getProducts()
// console.log(products)

const app = express ();
const http = require("http");


const server = http.createServer((req, res)=>{
    res.end("Hola Mundo!!!!")
})


server.listen(8080, () => {
    console.log("Escuchando 8080")
})

// import express  from "express";

// const app = express ();

// const usuarios =[
//     {id:"1", nombre:"nombre1", apellido:"apellido1", edad:21},
//     {id:"2", nombre:"nombre2", apellido:"apellido2", edad:22},
//     {id:"3", nombre:"nombre3", apellido:"apellido3", edad:23},
//     {id:"4", nombre:"nombre4", apellido:"apellido4", edad:24},
// ]


// app.get('/', (req, res) => {
//     res.send({usuarios})
// })


// app.get('/:idUsuario', (req, res) => {
//     let idUsuario = req.params.idUsuario;

//     let usuario = usuarios.find(u=>u.id===idUsuario);
//     if(!usuario) return res.send({error:"Usuario no encontrado"})
//     res.send({usuario})
// })

// app.listen(8080, ()=>{
//     console.log(8080)
// })