import { Router } from 'express'
import { check } from 'express-validator'
import authController from '../controllers/authController.js'
import favouritesController from '../controllers/favouritesController.js'
import feedController from '../controllers/feedController.js'
import userController from '../controllers/userController.js'
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

router.get('/feed', authMiddleware, feedController.getFeedContent)

router.put('/add-favourite', authMiddleware, favouritesController.addToFavourites)

router.get('/favourites', authMiddleware, favouritesController.getFavourites)

router.put('/remove-favourite', authMiddleware, favouritesController.removeFromFavourites)

router.get('/username', authMiddleware, userController.getUserName)

export default router
