import PropertyModel from "../model/property"
import UserModel from "../model/user"
import { V2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const getAllPropertiesService = async ({
    start,
    end,
    sort,
    order,
    title,
    propertyType
}) => {
    const query = {}


    if (title) {
        query.title = { $regex: title, $options: "i" }
    }

    if (propertyType) {
        query.propertyType = { $regex: propertyType, $options: "i" }
    }

    const count = await PropertyModel.countDocuments(query)

    const properties = await PropertyModel.find(query)
        .limit(end)
        .skip(start)
        .sort({ [sort]: order === "asc" ? 1 : -1 })

    return { count, properties }
}

const getPropertyDetailService = async (id) => {
    const property = await PropertyModel.findById(id)

    if (!property) {
        throw new Error("Property not found")
    }
    return property
}

const createPropertyService = async ({
    title,
    description,
    propertyType,
    location,
    price,
    photo,
    email
}) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const user = await UserModel.findOne({ email }).session(session)
        if (!user) {
            throw new Error("User not found")
        }
        const photoUrl = await cloudinary.uploader.upload(photo)

        const newProperty = new PropertyModel({
            title,
            description,
            propertyType,
            location,
            price,
            photo:
                photoUrl.url,
            creator: user._id
        })
        await newProperty.save({ session })

        user.allProperties.push(newProperty._id)
        await user.save({ session })

        await session.commitTransaction()
        session.endSession()

        return session
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        throw err
    }
}


export {
    getAllPropertiesService,
    getPropertyDetailService,
    createPropertyService
}