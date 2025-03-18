import { Router } from "express";
import remoteUpload from "../middlewares/upload.js";
import { userRegistration, userLogin, resetPassword } from "../controllers/authcontroller.js";

const authRouter = Router()

authRouter.post("/user", remoteUpload.none(), userRegistration)

authRouter.post("/user/login", remoteUpload.none(),  userLogin)

authRouter.post("/user/rest", remoteUpload.none(), resetPassword)


export default authRouter