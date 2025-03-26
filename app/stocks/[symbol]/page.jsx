import { stockPageData } from "@/app/actions/stockPageData";
import BackendBox from "@/components/BackendBox";

const sampleData = {
    "c": 219.285,
    "d": 1.015,
    "dp": 0.465,
    "h": 221.03,
    "l": 218.58,
    "o": 220.04,
    "pc": 218.27,
    "t": 1742836525
}

const StockPage = async ({ params }) => {
    const { symbol } = await params
    
    const data = await stockPageData(symbol)
    // const data = sampleData
    
    return ( 
        <div>
            <div>{symbol}</div>
            <div className="font-bold">{data.c}</div>
            <BackendBox currentPrice={data.c}/>
        </div>
        
     );
}
 
export default StockPage;