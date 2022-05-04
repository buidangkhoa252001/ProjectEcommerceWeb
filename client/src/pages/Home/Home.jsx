import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import laptop1 from './laptop_1.png';
import laptop2 from './laptop_2.png';
import laptop3 from './laptop_3.png';
import laptop4 from './laptop_4.png';
import laptop5 from './laptop_5.png';
import laptop6 from './laptop_6.png';
import laptop7 from './laptop_7.png';
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

class Home extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        const setting1 = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            arrows: false
        };
        return (
            <div className="home">
                <div className="slider">
                    <Slider {...settings}>
                        <div className="image-slider">
                            <div className="image-item">
                                <Link to="/products?page=1&sort=-createdAt&category=61bc3eb603e81bf349d64e48">  <img src={laptop1} alt="image_2" /> </Link>
                               
                            </div>
                        </div>
                        <div className="image-slider">
                            <div className="image-item">
                                <img src={laptop2} alt="image_2" />
                            </div>
                        </div>
                        <div className="image-slider">
                            <div className="image-item">
                                <img src={laptop3} alt="image_3" />
                            </div>
                        </div>
                        <div className="image-slider">
                            <div className="image-item">
                                <img src={laptop4} alt="image_4" />
                            </div>
                        </div>
                    </Slider>
                    <div className="img_grid">
                        <div className="img_grid-item">
                            <img src={laptop5} alt="image_5" />
                        </div>
                        <div className="img_grid-item">
                            <img src={laptop6} alt="image_6" />
                        </div>
                        <div className="img_grid-item">
                            <img src={laptop7} alt="image_4" />
                        </div>
                    </div>
                </div>
                <div className="slider_2">
                    <Slider {...setting1}>
                        <div className="image-slider">
                            <div className="image-item">
                                <img src={laptop1} alt="image_2" />
                            </div>
                        </div>
                        <div className="image-slider">
                            <div className="image-item">
                                <img src={laptop2} alt="image_2" />
                            </div>
                        </div>
                        <div className="image-slider">
                            <div className="image-item">
                                <img src={laptop3} alt="image_3" />
                            </div>
                        </div>
                        <div className="image-slider">
                            <div className="image-item">
                                <img src={laptop4} alt="image_4" />
                            </div>
                        </div>
                        <div className="image-slider">
                            <div className="image-item">
                                <img src={laptop4} alt="image_4" />
                            </div>
                        </div>
                        <div className="image-slider">
                            <div className="image-item">
                                <img src={laptop4} alt="image_4" />
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

export default Home;