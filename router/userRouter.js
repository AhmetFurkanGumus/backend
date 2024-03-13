const express = require('express')
const userRouter = express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const TokenControl = require('../middleware/auth')

userRouter.route('/register').post(async (req, res) => {
    try {
        const { name, password, email } = req.body
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.status(404).json({ message: 'This email is already exist' })
        }
        const user = await User.create({ name, password, email })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}),
    userRouter.route('/login').post(async (req, res) => {
        try {
            const { password, email } = req.body
            const userFromDB = await User.findOne({ email }) // MONGO DB DEN VERİ İSTENMESİDİR, findOne dediğimizde eğer varsa useri zaten geri gönderiyor.
            if (!userFromDB) {
                return res.status(404).json({ message: 'User Not Found!' }) // return ifadesi önemli 
            }
            //res.status(200).json({ message: 'Welcome' }) bu arkadaş artık if blokları altına yazılacak.
            if (userFromDB.password !== password) {
                return res.status(500).json({ message: 'You entered the incorrect password' }) 
                // return yazmayı unutmuştun , hataya düştü ise artık buradan zaten geri dönmeli return ile düşmediyse alttan devam
            }
            let { _id, name } = userFromDB  // id ekleme işlemi
            //CREATE JWT TOKEN

            //let privateKey="A3h0i0r*6i1f6"; //1Konu anlatım amaçlıdır, daha uzun , karışık ve güçlü olması önerilir. 2.env dosyası oluşturulduktan sonra değişime gidildi ve token içerisine private token yerine eklenendi (process.env.jwt)

            let token = jwt.sign({ _id, name, email },process.env.JWT_SECRET_KEY, { expiresIn: '1h' }) //1(_id,name) ekledim let id name oluşturduktan sonra
            /*privateKey*/
            res.status(200).json(
                {
                    message: 'Welcome',
                    token: token      // sola yazılanın property olduğunu sağdakinin senin eklemen olduğunu biliyor
                })
            //const user = await User.find({email,password})
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    })

userRouter.route('/getAll').get(TokenControl, async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = userRouter