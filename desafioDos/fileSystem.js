import { promises as fs } from "fs"

class ProductManager {
    constructor() {
        this.path = "./products.txt"
        this.products = []

    }

    static id = 0

    addProduct = async (title, description, price, thumbmail, code, stock) => {

        ProductManager.id++

        let newProduct = { title, description, price, thumbmail, code, stock, id: ProductManager.id }

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await (fs.readFile(this.path, "utf-8"))
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respGetProduct = await this.readProducts();
        return console.log(respGetProduct)
    }

    getProductsById = async (id) => {
        let respId = await this.readProducts();
        if (!respId.find(product => product.id === id)) {
            console.log("Not Found")
        } else {
            console.log(respId.find(product => product.id === id))
        }
    }

    updateProduct = async ({ id, ...updatedProduct }) => {
        await this.deleteProduct(id);
        let productsBefore = await this.readProducts()
        let modidifyProduct = [{ ...updatedProduct, id }, ...productsBefore]
        await fs.writeFile(this.path, JSON.stringify(modidifyProduct))
    }

    deleteProduct = async (id) => {
        let respDelete = await this.readProducts();
        let filterDelete = respDelete.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(filterDelete))
    }
}



const product = new ProductManager;



// PASO 1, AGREGAR PRODUCTOS

// product.addProduct('Producto 1','Descripcion de producto 1',1500,'https://www.productos.com/producto1.png','a1a1a1a1a1',30)
// product.addProduct('Producto 2','Descripcion de producto 2',3000,'https://www.productos.com/producto2.png','b2b2b2b2b2',30)
// product.addProduct('Producto 3','Descripcion de producto 3',4000,'https://www.productos.com/producto3.png','c3c3c3c3c3',30)




//PASO 2, Obtener los productos

// product.getProducts()




// PASO 3, Borrar productos

// product.deleteProduct(2)
// product.getProducts()





//PASO 4, ACTUALIZAR DATOS DE UN PRODUCTO

// product.updateProduct({
//     title: 'Producto 1 MOFIDICADO',
//     description: 'Descripcion de producto 1 MODIFICADO',
//     price: 1500,
//     thumbmail: 'https://www.productos.com/producto1.png',
//     code: 'a1a1a1a1a1',
//     stock: 30,
//     id: 1
// })

// product.getProducts()

