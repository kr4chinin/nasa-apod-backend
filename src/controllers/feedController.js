import axios from 'axios'
import { FEED_CHUNK_SIZE, CONTENT_API_KEY } from '../config.js'

class FeedController {
	async getFeedContent(req, res) {
		try {
			const response = await axios.get('https://api.nasa.gov/planetary/apod', {
				params: {
					api_key: CONTENT_API_KEY,
					count: FEED_CHUNK_SIZE
				}
			})
			const data = await response.data
			return res.status(200).json(data)
		} catch (e) {
			return res
				.status(400)
				.json({ message: 'Error while getting feed content' })
		}
	}
}

export default new FeedController()
