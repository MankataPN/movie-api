import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserModel } from "../model/usermodel.js"
import { addUserValidator, userLoginValidator, passwordResetValidator } from "../validators/uservalidators.js"


export const userRegistration = async (req, res, next) => {
    try {
        const { error, value } = addUserValidator.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json(error)
        }
        // Hash the password using bcrypt
        const saltRounds = 10; // Define the number of salt rounds
        value.password = await bcrypt.hash(value.password, saltRounds);

        //Save the user into the database
        const result = await UserModel.create(value)
        if (!result) {
            return res.status(404).json({ message: 'Sorry, Registration Unsuccessful' });
        }
        res.status(201).json({
            message: "Welcome! Registration Successful",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { error, value } = userLoginValidator.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json(error)
        }

        //find user by email in the database
        const result = await UserModel.findOne({ email: value.email })
        if (!result) {
            return res.status(404).json({ message: 'Invalid Email or Password' });
        }

        // Compare the entered password with the stored hashed password
        const passwordMatch = await bcrypt.compare(value.password, result.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate a JWT token upon successful login
        const token = jwt.sign(
            { userId: result._id, email: result.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "Login Successful!",
            token,
            user: { id: result._id, email: result.email },
        })
    } catch (error) {
        next(error)
    }
}

// export const forgotPassword = async (req, res, next) => {
//     try {
//         // Validate the email
//         const { error, value } = forgotPasswordValidator.validate(req.body, { abortEarly: false });
//         if (error) {
//             return res.status(400).json(error);
//         }

//         // Find user by email
//         const user = await UserModel.findOne({ email: value.email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Generate reset token
//         const resetToken = jwt.sign(
//             { userId: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         // Placeholder for sending token (log it here)
//         console.log(`Password reset token: ${resetToken}`);

//         res.status(200).json({ message: "Password reset token has been sent to your email!" });
//     } catch (error) {
//         next(error);
//     }
// };


// export const resetPassword = async (req, res, next) => {
//     try {
//         const{ error, value } = passwordResetValidator.validate(req.body, { abortEarly: false })
//         if (error) {
//             return res.status(400).json(error)
//         }
//         const result = await UserModel.findOne({email: value.email})
//         if (!result) {
//             return res.status(404).json({ message: 'Password Reset Unsuccessful' });
//           }

//         res.status(201).json({
//             message: "Password Reset Successful!",
//             data: result
//         })
//     } catch (error) {
//         next(error)
//     }
// }