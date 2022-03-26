import React from 'react';
import "./footer.css"
import IMG from "./logo1.png"
function Footer() {
   
    return (
        
    <div className="footer-container">
        <div className="row">

        
        <div className="col1"> 
            <img className="img-footer" src={IMG} alt="" />
            <button className="button-footer"><i className="icon-H fa-solid fa-heart icon" ></i>Cooperate With Us</button>

        </div>
        <div className="col2">
            <h2>ABOUT US</h2>
            <ul className="list-footer-col2">
                <li>Information</li>
                <li>Troubleshooting</li>
                <li>Contact - suggestions</li>
                <li>Service</li>
            </ul>
        </div>
        <div className="col3">
            <h2>Follow us on</h2>
            <ul className="list-footer-col2">
                <li><i className="icon-F fa-brands fa-facebook icon" ></i>Facebook</li>
                <li><i className="icon-I fa-brands fa-instagram icon" ></i>Instagram</li>
                <li><i className="icon-T fa-brands fa-tiktok icon"> </i><i className="icon-T1 fa-brands fa-tiktok"></i>Tiktok</li>
            </ul>
        </div>
    </div>
    <div className="line-footer"></div>
    <div className="text-last-footer">
        <h2><i className="fa-solid fa-marker icon" ></i>MAKE BY <span>LALATEAM</span></h2>
    </div>

</div>
 
    );
}


export default Footer;