
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

 
const HistoryDetail = () => {
    const params = useParams()
    const history = useSelector(state=>state.history)
    const [historyDetails, setHistoryDetails] = useState([])
   
    useEffect(()=>{
        console.log(history.history)
        console.log(params.id)
      

      history?.history.map(historyDetail=>{
                if(historyDetail._id===params.id){
                    setHistoryDetails(historyDetail)
                }
                console.log(historyDetails)
            })
    
        

    },[params,historyDetails,history])
    return (
        <div className="history-page">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Postal Code</th>
                    <th>Country Code</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{historyDetails.address.recipient_name}</td>
                    <td>{historyDetails.address.line1 + " - " + historyDetails.address.city}</td>
                    <td>{historyDetails.address.postal_code}</td>
                    <td>{historyDetails.address.country_code}</td>
                </tr>
            </tbody>
        </table>

        <table style={{margin: "30px 0px"}}>
            <thead>
                <tr>
                    <th></th>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
            {/*     {
                    historyDetails?.cart.map(item =>(
                    <tr key={item._id}>
                        <td><img src={item.images.url} alt="" /></td>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>$ {item.price * item.quantity}</td>
                    </tr>
                    ))
                } */}
                
            </tbody>
        </table>
    </div>
    );
}
 

 
export default HistoryDetail;