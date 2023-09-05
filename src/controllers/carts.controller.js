import cartsRepository from "../models/repositories/carts.repository.js"
import { HTTP_STATUS, successResponse } from "../utils/responses.js"

class CartController{
    async getCartProducts(req, res, next){
        const cid = req.params.cid
        try {
            const products = await cartsRepository.getCartProducts(cid)
            const response = successResponse(products)
            res.status(HTTP_STATUS.OK).send(response)
        } catch (error){
            next(error)
        }
    }

    async createCart(req, res, next){
        try {
            const newCart = await cartsRepository.createCart()
            const response = successResponse(newCart)
            res.status(HTTP_STATUS.CREATED).send(response)
        } catch (error){
            next(error)
        }
    }

    async addProductToCart(req, res, next){
        const cid = req.params.cid
        const pid = req.params.pid

        try {
            const addedProduct = await cartsRepository.addProductToCart(cid, pid)
            const response = successResponse(addedProduct)
            res.status(HTTP_STATUS.OK).send(response) 
        } catch (error){
            next(error)
        }
    }

    async removeProductFromCart (req, res, next){
        const cid = req.params.cid
        const pid = req.params.pid

        try {
            const removedProduct = await cartsRepository.removeProductFromCart(cid, pid)
            const response = successResponse(removedProduct)
            res.status(HTTP_STATUS.OK).send(response)
        } catch (error){
            next(error)
        }
    }

    async updateCartProducts(req, res, next){
        const cid = req.params.cid
        const products = req.body

        try {    
            const updatedProducts = await cartsRepository.updateCartProducts(cid, products)
            const response = successResponse(updatedProducts)
            res.status(HTTP_STATUS.OK).send(response)

        } catch (error){
            next(error)
        }
    }

    async updateProductQuantity(req, res, next){
        const cid = req.params.cid
        const pid = req.params.pid
        const {quantity} = req.body

        try {
            const updatedQuantity = await cartsRepository.updateProductQuantity(cid, pid, quantity);
            const response = successResponse(updatedQuantity)
            res.status(HTTP_STATUS.OK).send(response);   
        } catch (error){
            next(error)
        }
    }

    async deleteCartProducts(req, res, next){
        const cid = req.params.cid

        try {
            const removedProducts = await cartsRepository.deleteCartProducts(cid)
            const response = successResponse(removedProducts)
            res.status(HTTP_STATUS.OK).send(response)
        } catch (error){
            next(error)
        }
    }
}

export default new CartController()