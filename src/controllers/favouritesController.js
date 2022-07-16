import axios from 'axios'
import { CONTENT_API_KEY } from '../config.js' 
import User from '../models/User.js'

class FavouritesController {
    async addToFavourites(req, res) {
		try {
			const { username } = req.user
			const { postDate } = req.body
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

    async removeFromFavourites(req, res) {
		try {
			const { username } = req.user
			const { postDate } = req.body
			const user = await User.findOne({ username })
			let index = user.favourites.findIndex(fav => fav.date === postDate)
			if (index < 0) {
				return res
					.status(400)
					.json({ message: 'Element not found in favourites array' })
			}
			const deletedElement = user.favourites.splice(index, 1)
			await user.save()
			return res.status(200).json({
				message: 'Successfully removed from favourites',
				deletedElement: deletedElement[0]
			})
		} catch (e) {
			console.error('Failed to remove from favourites', e)
			return res
				.status(400)
				.json({ message: 'Failed to remove from favourites' })
		}
	}

    async getFavourites(req, res) {
		try {
			const { username } = req.user
			const user = await User.findOne({ username })
            const favouritePosts = []
			for (let fav of user.favourites) {
				let favouritePost = await axios.get('https://api.nasa.gov/planetary/apod', {
					params: {
						api_key: CONTENT_API_KEY,
						date: fav.date
					}
				})
                const data = await favouritePost.data
                favouritePosts.push(data)
			}
            return res.status(200).json(favouritePosts)
		} catch (e) {
			console.log('Failed to get favourites', e)
			return res.status(400).json({ message: 'Failed to get favourites' })
		}
	}
}

export default new FavouritesController()