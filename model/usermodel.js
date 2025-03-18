import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    watchlist: {type: String, default:[]}
}, {
    timestamps: true
})


export const UserModel = model("User", userSchema)