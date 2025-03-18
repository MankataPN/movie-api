import { UserModel } from "../model/usermodel.js";
import { userIdValidator, updateUserValidator } from "../validators/uservalidators.js";

export const getUser = async (req, res, next) => {
    try {
        const { error, value } = userIdValidator.validate(req.params, { abortEarly: false })
        if (error) {
            return res.status(400).json(error)
        }
        const result = await UserModel.findById(value.id)
        if (!result) {
            return res.status(404).json(error)
        }
        res.status(201).json(result)
               } catch (error) {
                next(error)
            }
}

export const updateUser = async (req, res, next) => {
    try {
        const { error, value } = updateUserValidator.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json(error)
        }
        const result = await UserModel.findByIdAndUpdate(req.params.id, value, { new: true })
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json({
            message: "Successfully Updated!",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { error, value } = userIdValidator.validate(req.params, { abortEarly: false })
        if (error) {
            return res.status(400).json(error)
        }
        const result = await UserModel.findByIdAndDelete(value.id)
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json({
            message: "Successfully Deleted!",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

