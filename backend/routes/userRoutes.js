import express from 'express';
import {
    getAllUser,
    createUser,
    getUserInfoById
} from "../controller/userController.js"

const userRouter = express.Router();

userRouter.route("/")
    .get(getAllUser)
    .post(createUser)

userRouter.route("/:id")
    .get(getUserInfoById)


export default userRouter