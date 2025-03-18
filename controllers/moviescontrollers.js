import { MovieModel } from "../model/moviesmodel.js";
import { addMovieValidator, movieIdValidator, updateMovieValidator } from "../validators/moviesvalidators.js";


export const addMovies = async (req, res, next) => {
    try {
        const { error, value } = addMovieValidator.validate( req.body, {abortEarly: false} )
        if (error) {
            return res.status(400).json(error)
        }
        const result = await MovieModel.create(value)
        if(!result) {
            return res.status(404).json("Sorry, Movie not added")
        }
        res.status(201).json({
            message: "Movie added!",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const getMovie = async ( req, res, next ) => {
    try {
        const { error, value } = movieIdValidator.validate(req.params, { abortEarly: false })
        if(error) {
            return res.status(400).json(error)
        }
        const result = await MovieModel.findById(value.id)
        if(!result) {
            return res.status(404).json( "Movie not found" )
        }
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

export const updateMovie = async (req, res, next) => {
    try {
        const { error, value } = updateMovieValidator.validate( req.body, {abortEarly:false} )
        if (error) {
            return res.status(400).json(error)
        }
        const result = await MovieModel.findByIdAndUpdate(req.params.id, value, {new: true})
        if(!result) {
            return res.status(404).json("Movie not found")
        }
        res.status(201).json({
            message: "Movie successfully updated",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const deleteMovie = async (req, res, next) => {
    try {
        const { error, value } = movieIdValidator.validate(req.params, { abortEarly:false} )
        if(error) {
            return res.status(400).json(error)
        }
        const result = await MovieModel.findByIdAndDelete(value.id)
        if(!result) {
            return res.status(400).json( "Movie not found" )
        }
        res.status(201).json({
            message: "Movie deleted!",
            data: result
        })
    } catch (error) {
        next(error)
    }
}