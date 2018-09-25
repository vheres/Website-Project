import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class Carouselclass extends Component{
    render() {
        return(
            <div>
            <Carousel showThumbs= {this.props.thumbs} useKeyboardArrows= {true} infiniteLoop= {true} emulateTouch={true} autoPlay= {true} centerMode={true} centerSlidePercentage={this.props.percentage}>
                <div>
                    <img src={this.props.img1} alt={this.props.name}/>
                </div>
                <div>
                    <img src={this.props.img2} alt={this.props.name}/>
                </div>
                <div>
                    <img src={this.props.img3} alt={this.props.name}/>
                </div>
            </Carousel>
            </div>
        );
    }
}

export default Carouselclass;