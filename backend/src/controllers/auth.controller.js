import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const signup = async (req, resp) => {
    const { fullName, email, password } = req.body
    try {
        // hash password

        if(!fullName || !email || !password){
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
        resp.status(500).json({message: 'Internal server error'})
    }
}

export const login = (req, resp) => {
    resp.send('login route')
}

export const logout = (req, resp) => {
    resp.send('logout route')
}