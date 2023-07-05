class ProductManager{
    constructor(){
        this.products=[]
    }

    static id=0

    addProduct(title, description, price, thumbmail, code, stock){
        ProductManager.id++
        this.products.push({title, description, price, thumbmail, code, stock, id:ProductManager.id});
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        if(!this.products.find((product)=> product.id === id)){
            return 'Not Found'
        }else{
            return this.products.find((product)=> product.id === id)
        }
    }
}
 const productos = new ProductManager();

 console.log(productos.getProducts());

 productos.addProduct('Producto 1','Descripcion de producto 1',1500,'https://www.productos.com/producto1.png','a1a1a1a1a1',30)
 productos.addProduct('Producto 2','Descripcion de producto 2',3000,'https://www.productos.com/producto2.png','b2b2b2b2b2',30)
 productos.addProduct('Producto 3','Descripcion de producto 3',4000,'https://www.productos.com/producto3.png','c3c3c3c3c3',30)

 console.log(productos.getProducts());

 console.log(productos.getProductById(1));
 console.log(productos.getProductById(2));
 console.log(productos.getProductById(3));
 console.log(productos.getProductById(4));