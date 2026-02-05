import mongoose from "mongoose"
import * as dotenv from "dotenv"
import PropertyModel from "../model/property.js"
import UserModel from "../model/user.js"
import { v2 as cloudinary } from "cloudinary"

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

/**
 * GET /properties
 */
const getAllProperties = async (req, res) => {
    try {
        const {
            _start = 0,
            _end = 10,
            _sort = "createdAt",
            _order = "asc",
            title_like,
            propertyType
        } = req.query

        const query = {}

        if (title_like) {
            query.title = { $regex: title_like, $options: "i" }
        }

        if (propertyType) {
            query.propertyType = { $regex: propertyType, $options: "i" }
        }

        const count = await PropertyModel.countDocuments(query)

        const properties = await PropertyModel.find(query)
            .limit(_end - start)
            .skip(_start)
        // .sort({ [_sort]: _order === "asc" ? 1 : -1 })

        res.header("x-total-count", count)
        res.header("Access-Control-Expose-Headers", "x-total-count")
        res.status(200).json(properties)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
/**
 * GET /properties/:id
 */
const getPropertyDetail = async (req, res) => {
    try {
        const { id } = req.params

        const property = await PropertyModel.findById(id).populate("creator")

        if (!property) {
            return res.status(404).json({ message: "Property not found" })
        }

        res.status(200).json(property)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/**
 * POST /properties
 */
const createProperty = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {
            title,
            description,
            propertyType,
            location,
            price,
            photo,
            email
        } = req.body

        const user = await UserModel.findOne({ email }).session(session)
        if (!user) {
            await session.abortTransaction()
            session.endSession()
            return res.status(404).json({ message: "User not found" })
        }

        const photoUrl = await cloudinary.uploader.upload(photo)

        const newProperty = new PropertyModel({
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url,
            creator: user._id
        })

        await newProperty.save({ session })

        user.allProperties.push(newProperty._id)
        await user.save({ session })

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            status: "Success",
            data: newProperty
        })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).json({ message: err.message })
    }
}

/**
 * UPDATE / properties 
 */
const updateProperty = async (req, res) => {
    try {
        const { id } = req.params

        const {
            title,
            description,
            propertyType,
            location,
            price,
            photo,
            email
        } = req.body

        const photoUrl = photo

        if (photo && photo.startsWith("data:")) {
            const uploadRes = await cloudinary.uploader.upload(photo)
            photoUrl = uploadRes.url
        }

        await PropertyModel.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                propertyType,
                location,
                price,
                photo: photoUrl
            }
        )
        res.status(200).json({ message: "Property update successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

/**
 *  DELETE / properties
 */
const deleteProperty = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { id } = req.params

        const property = await PropertyModel
            .findById(id).populate("creator").session(session)

        if (!property) {
            await session.abortTransaction()
            session.endSession()
            return res.status(404).json({ message: "Property not found" })
        }

        await PropertyModel.deleteOne({ _id: id }, { session })

        property.creator.allProperties.pull(property._id)
        await property.creator.save({ session })

        await session.commitTransaction()
        session.endSession()

        res.status(200).json({ message: "Property delete successfully" })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllProperties,
    getPropertyDetail,
    createProperty,
    updateProperty,
    deleteProperty
}


