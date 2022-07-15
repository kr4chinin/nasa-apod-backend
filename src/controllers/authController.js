import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

class AuthController {
	async registration(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Registration error', errors })
			}
			const { username, password } = req.body
			const candidate = await User.findOne({ username })
			if (candidate) {
				return res
					.status(400)
					.json({ message: 'User with this name already exists' })
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
			return res.status(400).json({ message: 'Failed to register' })
		}
	}
}

export default new AuthController()
