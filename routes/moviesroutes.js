import { Router } from "express";
import remoteUpload from "../middlewares/upload.js";
import { addMovies, getMovie, updateMovie, deleteMovie } from "../controllers/moviescontrollers.js";

const movieRouter = Router()

movieRouter.post("/movies", remoteUpload.none(), addMovies)

movieRouter.get("/movies/:id", remoteUpload.none(), getMovie)

movieRouter.patch("/movies/:id", remoteUpload.none(), updateMovie)

movieRouter.delete("/movies/:id", remoteUpload.none(), deleteMovie)

export default movieRouter