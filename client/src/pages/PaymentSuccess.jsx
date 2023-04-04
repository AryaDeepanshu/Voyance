import React from "react";
import { useSearchParams } from "react-router-dom";



const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const refernceNum = searchQuery.get("reference");
    return (
        <div style={{textAlign: "center"}}>
            <h1>Payment Successfull</h1>
            <text>Refernce No. {refernceNum}</text>
        </div>
        
    );
}
export default PaymentSuccess;