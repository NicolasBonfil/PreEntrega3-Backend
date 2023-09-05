import { HTTP_STATUS, HttpError } from "../../utils/responses.js"
import productsDAO from "../daos/dbManagers/products.dao.js"

class ProductsRepository{
    async getProducts(limit, page, filtro, sort){
        try {
            return await productsDAO.getProducts(limit, page, filtro, sort)
        } catch {
            throw new HttpError("Error al obtener los productos", HTTP_STATUS.BAD_REQUEST)
        }
    }

    async getProductById(id){
        try {
            return await productsDAO.getProductById(id)
        } catch {
            const products = await productsDAO.getLeanProducts()
            const existsProduct = products.find(p => p._id == id)
            if(!existsProduct){
                throw new HttpError("Producto inexistente", HTTP_STATUS.NOT_FOUND)
            }
        }
    }

    async addProduct(product){
        try {
            return await productsDAO.addProduct()
        } catch {
            const products = await productsDAO.getLeanProducts(product)
            const existsProduct = products.find(p => p.code == code)
            if(existsProduct){
                throw new HttpError("El producto ya esta registrado", HTTP_STATUS.BAD_REQUEST)
            }
        }
    }

    async updateProduct(pid, datosActualizados){
        try {
            return await productsDAO.updateProduct(pid, datosActualizados)
        } catch {
            if(!pid){
                throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
            }
            const products = await productsDAO.getLeanProducts()
    
            const existsProduct = products.find(p => p.code == datosActualizados.code)
            if(existsProduct){
                throw new HttpError("El producto ya esta registrado", HTTP_STATUS.BAD_REQUEST)
            }
    
            const product = products.find(p => p._id == pid)
            if(!product){
                throw new HttpError("Producto inexistente", HTTP_STATUS.NOT_FOUND)
            }
        }
    }

    async deleteProduct(pid){
        try {
            return await productsDAO.deleteProduct(pid)
        } catch {
            if(!pid){
                throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
            }
    
            const products = await productsDAO.getLeanProducts()
            const product = products.find(p => p._id == pid)
            if(!product){
                throw new HttpError("Producto inexistente", HTTP_STATUS.NOT_FOUND)
            }
        }
    }
}

export default new ProductsRepository()