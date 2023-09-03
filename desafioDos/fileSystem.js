import { promises as fs } from "fs"

class ProductManager {
    constructor() {
        this.path = "./products.txt"
        this.products = []

    }

    static id = 0

    addProduct = async (title, description, price, thumbmail, code, stock) => {
        try {
            if (!title || !description || !price || !thumbmail || !code || !stock) {
                console.log('Todos los campos son requeridos para actualizar un producto.')
                return;
            }
            const existingProduct = this.products.find(product => product.code === code);
            if (existingProduct) {
                console.log(`El producto con código ${code} ya existe.`);
                return;
            }
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

