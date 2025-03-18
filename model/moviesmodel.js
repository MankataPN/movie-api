import { Schema, model } from "mongoose";

const moviesSchema = new Schema({
    title: {type: String, required: true},
    releaseYear: { type: String},
    watched: { type: Boolean, default: false},
    user: {type: String}
}, {
    timestamps: true
})

export const MovieModel = model("Movie", moviesSchema)