const express = require('express')
const Books = require('../models/booksModel')
const Category = require('../models/categoryModel');
const booksRouter = express.Router()


booksRouter.route('/getAllbooks').get(async (req, res) => {
    try {
        const books = await Books.find({})
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

booksRouter.route('/addbooks').post(async (req, res) => {
    try {
        const { categoryID, ...otherFields } = req.body;

        // Kategori ID var mı diye kontrol et
        const existingCategory = await Category.findOne({ categoryID });

        if (!existingCategory) {
            return res.status(400).json({ message: 'Invalid categoryID' });
        }

        const books = await Books.create({ categoryID, ...otherFields });

        res.status(200).json('book is created');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//findbyid
booksRouter.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params
        const books = await Books.findById(id)
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

booksRouter.route('/:id').put( async (req, res) => {
    try {
        const { id } = req.params
        await Books.findByIdAndUpdate(id, req.body)
        const books = await Books.findById(id)
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
booksRouter.route('/:id').delete (async (req, res) => {
    try {
        const { id } = req.params
        const books = await Books.findByIdAndDelete(id, req.body)
        if (!books) {
            return res.status(404).json({message:'Books not found',status:false})
        }
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}),
booksRouter.route('/getBooksByCategory/:categoryID').get(async (req, res) => {
    try {
        const { categoryID } = req.params;
        console.log('Requested categoryID:', categoryID);

        // Kategori ID var mı diye kontrol et
        const existingCategory = await Category.findOne({ categoryID });
        if (!existingCategory) {
            console.log('Invalid categoryID');
            return res.status(400).json({ message: 'Invalid categoryID' });
        }

        // Kategorideki kitapları bul
        const books = await Books.find({ categoryID });
        console.log('Found books:', books);

        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books by category:', error);
        res.status(500).json({ message: error.message });
    }
});



module.exports=booksRouter