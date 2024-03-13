//Require
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { PORT, mongoDBURL } = require('./config.js')
const app = express();

//MONGODB CONNECTION
mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`)
    });
})
    .catch((error) => {
        console.log(error);
    })

//Models
const Books = require('./models/booksModel.js')
const Category=require('./models/categoryModel')


//CORS
app.use(cors())

//Router
const BooksRouter = require('./router/booksRouter')
const categoryRouter=require('./router/categoryRouter')
const userRouter=require('./router/userRouter')
const cartRouter = require('./router/cartRouter')
//ENV
require('dotenv').config()

//MIDDLE WARE
const authMiddleWare = require('./middleware/auth')


app.use(express.json())

//Books
app.use('/books', BooksRouter)

//Category
app.use('/category',categoryRouter)

//User
app.use('/auth',userRouter)

//Cart
app.use('/cart',cartRouter)


//Middleware
app.use(authMiddleWare)

