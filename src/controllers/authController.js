import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { SECRET_KEY } from '../config.js'

const generateAccessToken = (id, username) => {
	const payload = {
		id,
		username
	}
	return jwt.sign(payload, SECRET_KEY, {
		expiresIn: '1h'
	})
}

class AuthController {
	async registration(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ message: '❌ Invalid username or password format!', errors })
			}
			const { username, password } = req.body
			const candidate = await User.findOne({ username })
			if (candidate) {
				return res
					.status(400)
					.json({ message: '🚫 User with this name already exists!' })
			}
			const hashedPassword = bcrypt.hashSync(password, 5)
			const user = new User({
				username,
				password: hashedPassword,
				favourites: []
			})
			await user.save()
			return res.status(200).json({ message: 'Successfully registered' })
		} catch (e) {
			console.error('Failed to register', e)
			return res.status(400).json({ message: '⛔️ Failed to register!' })
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body
			const user = await User.findOne({ username })
			if (!user) {
				return res
					.status(400)
					.json({
						message: '⛔️ User with this name was not found, sign up below!'
					})
			}
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return res.status(400).json({ message: '🚫 Invalid password!' })
			}
			const token = generateAccessToken(user._id, user.username)
			return res.status(200).json({ token })
		} catch (e) {
			console.error('Failed to login', e)
			return res.status(400).json({ message: '🚷 Failed to login! Try again!' })
		}
	}
}

export default new AuthController()
