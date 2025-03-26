'use server'
import connectDB from "@/config/db"
import User from "@/models/User"
import Profile from "@/models/Profile"
import { revalidatePath } from "next/cache"
import { validateCreateUserInput } from "@/utils/inputValidation"
import generateToken from "@/utils/generateToken"

async function createUser(username, buyingPower, password, confirm_password) {
    await connectDB()

    const inputValidation = validateCreateUserInput(username, password, confirm_password)
    if(!inputValidation.isValid){
        return { error: inputValidation.error }
    }

    //check if the user exists
    const userExists = await User.findOne({username})
    if(userExists){
        return { error: 'Username already taken' }
    }

    //create user
    const user = await User.create({
        username,
        password
    })
    if(user){
        //create profile
        await Profile.create({
            user: user._id,
            description: `${user.username}'s profile`,
            buying_power: Number(buyingPower)
        })

        revalidatePath('/', 'layout')
        
        return { 
            success: "User registered successfully"
         }
    } else {
        return { error: 'Invalid user data' }
    }
} 

async function loginUser(prevState, formData){
    await connectDB()

    const username = formData.get('username')
    const password = formData.get('password')

    const user = await User.findOne({ username })

    if (user && (await user.matchPasswords(password))) {
        const token = generateToken(user._id)

        return { 
            user: {
                _id: user._id.toString(),
                username: user.username,
                token
            }
         }
    } else {
        return { error: 'Invalid username or password' }
    }
}

export {
    createUser,
    loginUser
}