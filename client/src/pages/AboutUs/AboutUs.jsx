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
                    <button href="#" className="btn btn--white"><Link style={{ textDecoration: "none" }}  to="/products">see our product</Link></button>

                    </div>
            
                </div>
            </div> 
            <div className="section-about">
                <div className="section-about-script">
                    <div className="section-title">About us </div>
                    <div className="section-script">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta accusamus labore nam officiis facere aliquam, sint non distinctio architecto harum. Consequatur sapiente, perferendis illum rem ratione veritatis? Corrupti, officiis consectetur.
                    </div>
                    <button className="btn-section">Learn more &rarr;</button>
                </div>
                <div className="about-imgs">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6S6SiqLikmS5E_tJyjaps4R3AxlQ7vogWrQ&usqp=CAU" alt="photo1" className="about-img img1" />
                    <img src="https://techvccloud.mediacdn.vn/2020/6/8/top-6-loi-ich-cua-may-chu-dam-may-cho-e-commerce-website-15915900672601033542225-crop-15915900716041331039284.jpg" alt="photo1" className="about-img img2" />
                    <img src="https://www.digital38.com.vn/wp-content/uploads/2021/01/kinh-doanh-thuong-mai-dien-tu.jpg" alt="photo1" className="about-img img3" />
                </div>
            </div>  
            <div className="about-location">Location</div>
                    <div className="about-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5311584323636!2d106.66981381433668!3d10.77057056224804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ede404fe8d1%3A0x4df37527d1c86b27!2sYaMe%20Shop!5e0!3m2!1svi!2s!4v1647570875934!5m2!1svi!2s" width="100%" height="300px" /* style="border:2;" */ allowFullScreen="" loading="lazy" />{/* </iframe> */}
            </div>
        </div>
    );
}

export default AboutUs;