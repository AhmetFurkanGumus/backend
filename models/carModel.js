const { default: mongoose } = require("mongoose");

const cartModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    booksId:{
        type:String,
        required:true
    }
})

const Cart = mongoose.model('Cart',cartModel)
module.exports = Cart
