import express from 'express'
import cors from 'cors'
import authRouter from './router/authRouter.js'
import mongoose from 'mongoose'

const app = express()

const DB_URL = 'mongodb+srv://nasa-apod-login:nasa-apod-password@users-cluster.o0xkg.mongodb.net/?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())
app.use('/', authRouter)

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        mongoose.connect(DB_URL, () => console.log('Successfully connected to Atlas MongoDB'))
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.error('Error occured while starting server', e)
    }
}

start()