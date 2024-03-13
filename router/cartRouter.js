const express = require('express')
const Cart = require('../models/carModel')
const cartRouter = express.Router()


cartRouter.route('/addToCart').post(async (req, res) => {
    try {
        const { booksId } = req.body
        const cart = await Cart.findOne({ booksId })
        if (cart) {
            let newCart = {
                name: cart.name,
                img: cart.img,
                booksId: cart.booksId,
                price: cart.price,
                quantity: cart.quantity + 1
            }
            await Cart.findByIdAndUpdate(cart._id, newCart)
            return res.status(200).json({ message: 'Cart Updated' })

        }else{
            await Cart.create(req.body)
            return res.status(200).json({ message: 'Cart Created' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, status: false })
    }
})

cartRouter.route('/getAll').get(async (req, res) => {
    try {
        const carts = await Cart.find({})
        res.status(200).json({ carts: carts })
    } catch (error) {
        res.status(500).json({ message: error.message, status: false })

    }
})

cartRouter.route('/deleteAll').get(async (req, res) => {
    try {
        await Cart.deleteMany({})
        res.status(200).json({ message: 'Cart is Deleted', status: true })
    } catch (error) {
        res.status(500).json({ message: error.message, status: false })

    }
})

module.exports = cartRouter