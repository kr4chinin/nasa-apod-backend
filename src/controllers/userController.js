class UserController {
	async getUserName(req, res) {
		try {
			const { username } = req.user
			return res.status(200).json(username)
		} catch (e) {
			return res.status(400).json({ message: 'Failed to get username' })
		}
	}
}

export default new UserController()
