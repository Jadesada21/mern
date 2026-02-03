import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import {
    getAllPropertiesService,
    getPropertyDetailService,
    createPropertyService
} from "../service/propertyService";

dotenv.config();

const getAllProperties = async (req, res) => {
    try {
        const serviceInput = {
            start: "",//Number(req.query._start) || 0,
            end: "",// Number(req.query._end) || 10,
            sort: "",//req.query._sort || "createdAt",
            order: "",//req.query._order || "asc",
            title: "",//req.query.title_like,
            propertyType: "",//req.query.propertyType
        }
        const { count, properties } = await getAllPropertiesService(serviceInput)
        res.header("x-total-count", count)
        res.header("Access-Control-Expose_headers", "x-total-count")
        res.status(200).json(properties)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getPropertyDetail = async (req, res) => {
    try {
        const { id } = req.params

        const property = await getPropertyDetailService(id)
        res.status(200).json(property)
    } catch (err) {
        if (err.message === "PROPERTY_NOT_FOUND") {
            return res.status(404).json({ message: "Property not found" })
        }
        res.status(500).json({ message: err.message })
    }
}

const createProperty = async (req, res) => {
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

        const property = await createPropertyService({
            title,
            description,
            propertyType,
            location,
            price,
            photo,
            email
        })
        res.status(200).json({ status: "Success", data: property })
    } catch (err) {
        if (err.message === "USER_NOT_FOUND") {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(500).json({ message: err.message })
    }
}