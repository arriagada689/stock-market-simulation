'use client'

import { useState } from "react";

const BackendBox = ({ currentPrice }) => {
    const [amount, setAmount] = useState('')
    const [estimatedQuantity, setEstimatedQuantity] = useState('')

    const handleChange = (e) => {
        const inputValue = e.target.value;
        // Allow only numbers (and empty string for clearing input)
        if (/^\d*$/.test(inputValue)) {
            setAmount(inputValue);

            //calculate estimated quantity of shares
            setEstimatedQuantity(parseFloat((amount / currentPrice).toFixed(6)))
        }

        if(inputValue.length === 0){
            setEstimatedQuantity('')
        }
    };

    const handleConfirmClick = () => {
        console.log(amount);
    }
    
    return ( 
        <div className="border">
            <div>Backend Box</div>
            <input type="text" value={amount} onChange={handleChange} placeholder="$0.00" className="border"/>
            {estimatedQuantity && <div>{estimatedQuantity}</div>}

            <button onClick={handleConfirmClick}>Confirm</button>
        </div>
     );
}
 
export default BackendBox;