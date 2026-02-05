import UserModel from '../model/user.js'

/**
 * GET / User
 */
const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find({}).limit(req.query._end);
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/**
 * POST / User
 */
const createUser = async (req, res) => {
    try {
        const { name, email, avatar } = req.body

        if (!name || !email) {
            return res.status(400).json({ message: "name and email are required" })
        }

        const userExits = await UserModel.findOne({ email })

        if (userExits) return res.status(200).json(userExits)

        const newUser = await UserModel.create({ name, email, avatar })
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/**
 * GET / BY ID
 */

const getUserInfoById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findOne({ _id: id }).populate("allProperties")

        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllUser,
    createUser,
    getUserInfoById
}