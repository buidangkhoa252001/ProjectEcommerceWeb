import React from 'react';
import "./loading.css"
import ReactLoading from 'react-loading';
const Loading= () => {
    return (
        <div className="container1">
          <ReactLoading type="spin" color="black" height={250} width={255} />        
        </div>
    );
}
 

 
export default Loading;