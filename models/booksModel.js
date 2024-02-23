// const { Schema, default: mongoose } = require('mongoose')
import mongoose from "mongoose"
const {Schema} = mongoose;

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
        type:String,
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

const Books = mongoose.model('Books',booksSchema);
export default Books;
export {mongoose};
// module.exports = Books