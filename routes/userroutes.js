import { Router } from "express";
import remoteUpload from "../middlewares/upload.js";
import { getUser, updateUser, deleteUser, } from "../controllers/usercontroller.js";

const userRouter = Router()

userRouter.get("/user/:id", remoteUpload.none(), getUser)

userRouter.patch("/user/:id", remoteUpload.none(), updateUser)

userRouter.delete("/user/:id", remoteUpload.none(), deleteUser)

export default userRouter