import express from "express";
import mongoose from "mongoose";
import Books from "./models/booksModel.js";
import { PORT, mongoDBURL } from "./config.js"


//MONGODB CONNECTION
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    })

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Selam Birader')
});

app.get('/books', async function (req, res) {
    try {
        const books = await Books.find({})
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.post('/addbooks', async (req, res) => {
    try {
        const books = await Books.create(req.body)
        res.status(200).json('book is created')
    } catch (error) {
        res.status(500).json({message:error.message})

    }
})

