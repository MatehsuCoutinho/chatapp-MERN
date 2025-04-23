import { json } from "express"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, resp) => {
    const { fullName, email, password } = req.body
    try {
        // hash password

        if (!fullName || !email || !password) {
            return resp.status(400).json({ message: 'All fields are required' })
        }
        if (password.length < 6) {
            return resp.status(400).json({ message: 'Password must be at least 6 characters' })
        }

        const user = await User.findOne({ email })

        if (user) return resp.status(400).json({ message: 'Email already exists' })

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedpassword
        })

        if (newUser) {
            generateToken(newUser._id, resp)
            await newUser.save()

            resp.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        }
        else {
            return resp.status(400).json({ message: 'Invalid user data' })
        }


    } catch (error) {
        console.log('Error in signup controller', error.message)
        resp.status(500).json({ message: 'Internal server error' })
    }
}

export const login = async (req, resp) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return resp.status(400).json({ message: 'Invalid credentails' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return resp.status(400).json({ message: 'Invalid credentails' })
        }
        generateToken(user._id, resp)

        resp.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log('Error in login controller', error.message)
        resp.status(500).json({ message: 'Internal Server Error' })
    }
}

export const logout = (req, resp) => {
    try {
        resp.cookie('jwt', '', { maxAge: 0 })
        resp.status(200).json({ message: 'Logged out sucessfully' })
    } catch (error) {
        console.log('Error in logout controller', error.message)
        resp.status(500).json({ message: 'Interal Server Error' })
    }
}

export const updateProfile = async (req, resp) => {
    try {
        const { profilePic } = req.body
        const userId = req.user._id

        if (!profilePic) {
            return resp.status(400), json({ message: 'Profile pic is required' })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findById(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        resp.status(200).json(updatedUser)


    } catch (error) {
        console.log('Error in update profile', error)
        resp.status(500).json({ message: 'Internal Server Error' })
    }
}

export const checkAuth = (req, resp) => {
    try {
        resp.status(200).json(req.user)
    } catch (error) {
        console.log('Error in checkAuth controller', error.message)
        resp.status(500).json({ message: 'Internal Server Error' })
    }
}