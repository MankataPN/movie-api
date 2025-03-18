import express from "express"
import userRouter from "./routes/userroutes.js"
import movieRouter from "./routes/moviesroutes.js"
import authRouter from "./routes/authroute.js"
import mongoose from "mongoose"

await mongoose.connect(process.env.MONGO_URI)

const app = express()

app.use(express.json())

app.use("/api/v1", userRouter)
app.use("/api/v1", movieRouter)
app.use("/api/v1", authRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})