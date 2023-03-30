import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Slider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import laptop1 from './laptop_1.png';
import laptopRogFlowZ13 from './imageRogFlow.png';
import LaptopAcerNitro from './laptopAcerNitro.png';
import rogTrix from './RogStrix.jpg';
import earCorsair from './earCorsair.jpg';
import Logitech from './keyboardLogitech.png';
import mouseWireless from './mouseWireless.jpg';
import mouse from './mouse.png';
import keyboard from './keyboard.jpg';
import monitor from './monitor.jpg';
import earPhone from './earPhone.jpg';
import laptop from './laptop.jpg';
import { Link } from 'react-router-dom';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", zIndex: "2", }}
            onClick={onClick}
        />
    );
}

function Slider1() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const setting1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: false
    };
    return (
        <div >
            <div className="slider">
                <Slider {...settings}>
                    <div className="image-slider">
                        <div className="image-item">
                            <Link to="/products"><img src={laptop1} alt="image_2" /></Link>
                        </div>
                    </div>
                    <div className="image-slider">
                        <div className="image-item">
                            <Link to="/products"><img src={laptopRogFlowZ13} alt="image_2" /></Link>
                        </div>
                    </div>
                    <div className="image-slider">
                        <div className="image-item">
                            <Link to="/products"><img src={LaptopAcerNitro} alt="image_3" /></Link>
                        </div>
                    </div>
                    <div className="image-slider">
                        <div className="image-item">
                            <Link to="/products"><img src={rogTrix} alt="image_4" /></Link>
                        </div>
                    </div>
                </Slider>
                <div className="img_grid">
                    <div className="img_grid-item">
                        <Link to="/products"><img src={earCorsair} alt="image_5" /></Link>
                    </div>
                    <div className="img_grid-item">
                        <Link to="/products"><img src={mouseWireless} alt="image_5" /></Link>
                    </div>
                    <div className="img_grid-item">
                        <Link to="/products"><img src={Logitech} alt="image_5" /></Link>
                    </div>
                </div>
            </div>
            <div className="slider_2">
                <Slider {...setting1}>
                    <div className="image-slider">
                        <div className="image-item">
                            <Link to="/products"><img src={mouse} alt="image_2" /></Link>
                        </div>
                    </div>
                    <div className="image-slider">
                        <div className="image-item">
                            <Link to="/products"><img src={keyboard} alt="image_2" /></Link>
                        </div>
                    </div>
                    <div className="image-slider">
                        <div className="image-item">
                            <Link to="/products"><img src={monitor} alt="image_3" /></Link>
                        </div>
                    </div>
                    <div className="image-slider">
                        <div className="image-item">
                            <Link to="/products"><img src={earPhone} alt="image_4" /></Link>
                        </div>
                    </div>
                    <div className="image-slider">
                        <div className="image-item">
                            <Link to="/products"><img src={laptop} alt="image_4" /></Link>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
}


export default Slider1;