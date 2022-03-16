import React from 'react';
import {FaFacebook,FaInstagram,
    FaTiktok,FaMarker,FaHeart} from "react-icons/fa";
import "./Footer.css";
import myImage from "./images/logo1.png";


function Footer() {
    const style = { marginRight: "10px" };

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col1">
                        <img className="img-footer" src={myImage} alt="" />
                        <button className="button-footer"><FaHeart className="icon-H" style={style} />Cooperate With Us</button>
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
                            <li><FaFacebook className="icon-F" style={style} />Facebook</li>
                            <li><FaInstagram className="icon-I" style={style} />Instagram</li>
                            <li><FaTiktok className="icon-T" style={style}  /><FaTiktok className="icon-T1" />Tiktok</li>
                        </ul>
                    </div>
                </div>
                <div className="line-footer"></div>
                <div className="text-last-footer">
                    <h2><FaMarker style={style} />MAKE BY <span>LALATEAM</span></h2>
                </div>
                
            </div>
        </div>
    );
}

export default Footer;
