import express from "express";
import productManager from "./productManager.js";


const manager = new productManager('../products.txt') 
const app = express();

app.get('/products', async(req,res)=>{
    const {limit} = req.query
    const products = await manager.getProducts()
    if(limit){
        const productLimit = products.slice(0, limit)
        res.send({productLimit})
        return
    }
    else{
        res.send({products})
    }
    
})

app.get('/products/:pid', async(req,res)=>{
    const pid= parseInt(req.params.pid)
    const productsById = await manager.getProductsById(pid)
        res.send(productsById)
})

app.listen(8080,()=>{
    console.log('listening 8080')
})