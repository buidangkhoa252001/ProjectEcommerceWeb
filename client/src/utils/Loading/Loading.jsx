import React from 'react';
import "./loading.css"
/* import ReactLoading from 'react-loading'; */
import BounceLoader	 from "react-spinners/BounceLoader";
const Loading= () => {
    return (
        <div className="container1">
         {/*  <ReactLoading type="spin" color="black" height={250} width={255} />     */}
          <BounceLoader	 color="red" css="speedMultiplier: 0.6;"   size={230} />   
        </div>
         
    );
}


 
export default Loading;