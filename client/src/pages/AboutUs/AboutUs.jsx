import React from 'react';
import { Link } from 'react-router-dom';
import "./aboutus.css"
const AboutUs = () => {
    return (
        <div>
              <div className="about">
    
                <div className="about__text-box">
                    <h3 className="about-primary">
                        <div className="about-primary--main">About Shop</div>
                        <span className="about-primary--sub">Going To Our Shop</span>
                    </h3>
                    <div>
                    <button href="#" className="btn btn--white"><Link style={{ textDecoration: "none" ,color: "crimson",  
                fontSize: "18px" , 
  }}  to="/products">see our product</Link></button>

                    </div>
            
                </div>
            </div> 
            <div className="section-about">
                <div className="section-about-script">
                    <div className="section-title">About shop </div>
                    <div className="section-script">The Laptop Shop is a local  company in Ho Chi Minh city.Buy cheap laptop, 100% genuine laptop, thoughtful after-sales warranty, always update new laptop daily,
                    </div>
                    <button className="btn-section"><Link style={{ textDecoration: "none" }}  to="/products">Know more</Link> &rarr;</button>
                </div>
                <div className="about-imgs">
                    <img src="https://cmcdistribution.com.vn/en/wp-content/uploads/2020/12/How-To-Create-An-EPIC-Laptop-Gaming-SETUP-2019.jpg" alt="photo1" className="about-img img1" />
                    <img src="https://i.pinimg.com/564x/69/96/ad/6996ad37d46c2bca363550c12279ee63.jpg" alt="photo1" className="about-img img3" />
                    <img src="https://i.pinimg.com/564x/82/7b/0b/827b0b102be31d3e17052a854aab2a44.jpg" alt="photo1" className="about-img img2" />
                </div>
            </div>  
            <div className="about-location">Location</div>
                    <div className="about-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15676.64597678239!2d106.6474462!3d10.7989404!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6aece518177f9a92!2sGEARVN!5e0!3m2!1svi!2s!4v1652169642179!5m2!1svi!2s" width="100%" height="300px" /* style="border:0;" */ allowFullScreen="" loading="lazy" />
            </div>
        </div>
    );
}

export default AboutUs;