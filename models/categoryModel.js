//const { Schema, model, default: mongoose } = require('mongoose')
const mongoose=require('mongoose')


const categorySchema = new mongoose.Schema({

    title:{
        type:String,
        required:true

    },
    active:{
        type:Boolean,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    categoryID:{
        type:Number,
        required:true,
        unique: true // Benzersiz kategori ID'si
    },
    

})

const Category = mongoose.model('Category',categorySchema);
module.exports = Category