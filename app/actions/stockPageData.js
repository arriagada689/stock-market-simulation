'use server'

import connectDB from "@/config/db"
import Profile from "@/models/Profile"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

const BASE_URL = `https://finnhub.io/api/v1/`

async function getFinnhubData(symbol) {
    if(symbol.length > 0){
        try {
            const url = `${BASE_URL}quote?symbol=${symbol}&token=${process.env.FINNHUB_KEY}`
            const response = await fetch(url)
            if(response.ok){
                const data = await response.json()
    
                return data
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }  
        } catch (error) {
            console.error(error.message)
        }
    }
}

async function getProfileData(symbol) {
    await connectDB()
    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId){
        return null
    } else {
        const { userId } = sessionUser
        const profile = await Profile.findOne({ user: userId })
        return {
            buying_power: profile.buying_power
        }
    }
}

export {
    getFinnhubData,
    getProfileData
}