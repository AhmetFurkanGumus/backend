const { Schema, model } = require('mongoose')
const booksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true,'Price is required'],
        min : 0,
    },
    category:{
        type:Number,
        required:true
    },
    publisher:{
        type:String,
    },
    pages:{
        type:Number,
    },
    quantity:{
        type:Number,
        required:true,
        min : 0,
    },
    active:{
        type:Boolean,
        required:true
    },
    img:{
        type:String,
    },
    author:{
        type:String,
        
    }
    
})

const Books = model('Books',booksSchema);
module.exports = Books