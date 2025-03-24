'use server'

const BASE_URL = `https://finnhub.io/api/v1/`

async function stockPageData(symbol) {
    if(symbol.length > 0){
        const url = `${BASE_URL}quote?symbol=${symbol}&token=${process.env.FINNHUB_KEY}`
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
            return data
        } else {
            const error = await response.json()
            console.error(error.message)
        }
    }
}

export {
    stockPageData
}