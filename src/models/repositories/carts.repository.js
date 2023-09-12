import { HTTP_STATUS, HttpError } from "../../utils/responses.js"
import cartsDAO from "../daos/dbManagers/carts.dao.js"
import cartsModel from "../schemas/carts.js"

class CartsRepository{
    async getCartProducts(cid){
        try {
            return await cartsDAO.getCartProducts(cid) 
        } catch{
            if(!cid){
                throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
            }
        
            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                throw new HttpError("Carrito inexistente", HTTP_STATUS.NOT_FOUND)
            }
        }
    }

    async createCart(){
        try {
            return await cartsDAO.createCart()
        } catch {
            throw new HttpError("Error al crear el carrito", HTTP_STATUS.BAD_REQUEST)
        }
    }

    async addProductToCart(cid, pid){
        try{
            return await cartsDAO.addProductToCart(cid, pid)
        } catch {
            if(!cid || !pid){
                throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
            }
        
            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                throw new HttpError("Carrito inexistente", HTTP_STATUS.NOT_FOUND)
            }
        }
    }

    async removeProductFromCart(cid, pid){
        try{
            return await cartsDAO.removeProductFromCart(cid, pid)
        } catch {
            if(!cid || !pid){
                throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
            }

            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                throw new HttpError("Carrito inexistente", HTTP_STATUS.NOT_FOUND)
            }

            const productIndex = cart.productsInCart.findIndex(p => p.product._id == pid);
            if(productIndex === -1){
                throw new HttpError("Producto no encontrado", HTTP_STATUS.NOT_FOUND)
            }
        }
    }

    async updateCartProducts(cid, products){
        try{
            return await cartsDAO.updateCartProducts(cid, products)
        } catch {
            if(!cid){
                throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
            }
        
            products.forEach(p => {
                if(!p.product._id || !p.quantity){
                    throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
                }
            })

            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                throw new HttpError("Carrito inexistente", HTTP_STATUS.NOT_FOUND)
            }
        }
    }

    async updateProductQuantity(cid, pid, quantity){
        try{
            return await cartsDAO.updateProductQuantity(cid, pid, quantity)
        } catch {
            if(!cid || !pid || !quantity){
                throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
            }

            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                throw new HttpError("Carrito inexistente", HTTP_STATUS.NOT_FOUND)
            }

            const productIndex = cart.productsInCart.findIndex(p => p.product._id == pid);
            if(productIndex === -1){
                throw new HttpError("Producto no encontrado", HTTP_STATUS.NOT_FOUND)
            }
            if(productIndex === -1) return res.status(400).send({status: "error", error: "Producto no encontrado"})

            if (typeof quantity !== "number" || quantity <= 0 || !(Number.isInteger(quantity))) return res.status(400).send({status: "error", error: "La cantidad debe ser un número entero mayor a cero"});
        }
    }

    async deleteCartProducts(cid){
        try{
            return await cartsDAO.deleteCartProducts(cid)
        } catch {
            if(!cid){
                throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
            }

            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                throw new HttpError("Carrito inexistente", HTTP_STATUS.NOT_FOUND)
            }
        }
    }
}

export default new CartsRepository()