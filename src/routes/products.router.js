import { Router } from "express"
import productController from "../controllers/products.controller.js"
import isAdmin from "../middlewares/isAdmin.middleware.js"

class ProductRouter{
    constructor(){
        this.InicioProduct = Router()
        this.InicioProduct.get("/", isAdmin, productController.getProducts)
        this.InicioProduct.get("/:id", productController.getProductById)
        this.InicioProduct.post("/", productController.addProduct)
        this.InicioProduct.put("/:pid", productController.updateProduct)
        this.InicioProduct.delete("/:pid", productController.deleteProduct)
    }

    getRouter(){
        return this.InicioProduct
    }
}

export default new ProductRouter()