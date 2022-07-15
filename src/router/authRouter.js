import { Router } from 'express'
import { check } from 'express-validator'
import authController from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = new Router()

router.get('/', (req, res) => {
	res.status(200).json({ message: 'Server is working' })
})

router.post(
	'/registration',
	[
		check('username', 'Username can not be empty').notEmpty(),
		check('password', 'Password can not be empty').notEmpty()
	],
	authController.registration
)

router.post('/login', authController.login)

router.get('/content', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Some content'})
})

export default router
