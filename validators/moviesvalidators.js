import Joi from "joi";

export const addMovieValidator = Joi.object({
    title: Joi.string().required(),
    releaseYear: Joi.string(),
    watched: Joi.boolean(),
    user: Joi.string().required()
})


export const updateMovieValidator = Joi.object({
    title: Joi.string().optional(),
    releaseYear: Joi.string().email().optional(),
    watched: Joi.string().optional(),
    user: Joi.string().optional()
});


export const movieIdValidator = Joi.object({
    id: Joi.string().required()
})