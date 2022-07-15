import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { FEED_CONTENT_API_KEY, key } from '../config.js'
import User from '../models/User.js'

const generateAccessToken = (id, username) => {
	const payload = {
		id,
		username
	}
	return jwt.sign(payload, key.secret, {
		expiresIn: '1h'
	})
}

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

	async login(req, res) {
		try {
			const { username, password } = req.body
			const user = await User.findOne({ username })
			if (!user) {
				return res
					.status(400)
					.json({ message: `User with name ${username} was not found` })
			}
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return res.status(400).json({ message: 'Invalid password' })
			}
			const token = generateAccessToken(user._id, user.username)
			return res.status(200).json({ token })
		} catch (e) {
			console.error('Failed to login', e)
			return res.status(400).json({ message: 'Failed to login ' })
		}
	}

	async addToFavourites(req, res) {
		try {
			const { username, postDate } = req.body
			const user = await User.findOne({ username })
			user.favourites.push({ date: postDate })
			await user.save()
			return res
				.status(200)
				.json({ message: 'Successfully added to favourites' })
		} catch (e) {
			console.error('Failed to add to favourites', e)
			return res.status(400).json({ message: 'Failed to add to favourites' })
		}
	}

	async getFavourites(req, res) {
		try {
			const { username } = req.body
			const user = await User.findOne({ username })
			return res.status(200).json(user.favourites)
		} catch (e) {
			console.log('Failed to get favourites', e)
			return res.status(400).json({ message: 'Failed to get favourites' })
		}
	}

    async getFeedContent(req, res) {
        try {
            const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${FEED_CONTENT_API_KEY}4&count=10`)
            const data = await response.data
            return res.status(200).json(data)
        } catch (e) {
            console.error('Error while getting feed content', e)
            return res.status(400).json({message: 'Error while getting feed content'})
        }
    }
}

export default new AuthController()
