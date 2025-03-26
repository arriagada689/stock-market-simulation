import { getFinnhubData, getProfileData } from "@/app/actions/stockPageData";
import BackendBox from "@/components/BackendBox";

const sampleData = {
    "c": 219.285, //current price
    "d": 1.015, //change
    "dp": 0.465, //percent change
    "h": 221.03, //high price of the day
    "l": 218.58, // low price of the day
    "o": 220.04, // open price of the day
    "pc": 218.27, //previous close price
    "t": 1742836525
}

const StockPage = async ({ params }) => {
    const { symbol } = await params
    
    // const finnhubData = await getFinnhubData(symbol)
    const finnhubData = sampleData

    const profileData = await getProfileData()
    
    return ( 
        <div>
            <div>{symbol}</div>
            <div className="font-bold">{finnhubData.c}</div>
            <BackendBox currentPrice={finnhubData.c} buyingPower={profileData.buying_power}/>
        </div>
        
     );
}
 
export default StockPage;