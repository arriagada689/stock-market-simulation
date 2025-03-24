'use server'
import { revalidatePath } from "next/cache"

const BASE_URL = `https://finnhub.io/api/v1/search?&exchange=US&token=${process.env.FINNHUB_KEY}`

async function search(prevState, formData) {
    const query = formData.get('query')
    
    if(query.length > 0){
        const url = `${BASE_URL}&q=${encodeURIComponent(query)}` 
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
            return { results: data.result }
        } else {
            const error = await response.json()
            console.error(error.message)
        }
    }
}

export {
    search
}