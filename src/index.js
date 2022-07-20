import express from 'express'
import cors from 'cors'
import mainRouter from './router/mainRouter.js'
import mongoose from 'mongoose'
import { DB_URL } from './config.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', mainRouter)

const PORT = process.env.PORT || 3000

const start = async () => {
	try {
		mongoose.connect(DB_URL, () =>
			console.log('Successfully connected to Atlas MongoDB')
		)
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.error('Error occured while starting server', e)
	}
}

start()
