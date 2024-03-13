const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const booksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0,
    },
    publisher: {
        type: String,
    },
    pages: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    active: {
        type: Boolean,
        required: true
    },
    img: {
        type: String,
        required:true
    },
    author: {
        type: String,
    },
    categoryID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Category',
        required: true,
    },
});

const Books = model('Books', booksSchema);
module.exports = Books;
