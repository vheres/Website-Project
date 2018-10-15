import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Thumbnail } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { Link } from 'react-router-dom';
 
class BrandCarousel extends Component {
    responsive = {
        0: { items: 2 },
        1080: { items: 2 }
      };
      
      galleryItems() {
        var images = [];
        images.push("https://images.all-free-download.com/images/graphiclarge/dr_martens_logo_28842.jpg")
        images.push("https://images.all-free-download.com/images/graphiclarge/dr_martens_logo_28842.jpg")
        images.push("data:image/png;base64,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")
        images.push("data:image/png;base64,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")
        return (
          images.map((item, i) => (
            //   <div className="brand-holder"><img src={item} style={{width:"400px", height:"250px"}}></img></div>
              <img src={item} style={{width:"400px", height:"250px"}}></img>
                // <Thumbnail src = {item}></Thumbnail>
          ))
        )
      };
    render() {
        // https://cdn.shopify.com/s/files/1/2689/9614/products/1_13_380x380.png?v=1517427207
        const items = this.galleryItems();
        return (
                    <AliceCarousel
                    items={items}
                    duration={400}
                    autoPlay={true}
                    startIndex = {1}
                    fadeOutAnimation={true}
                    autoPlayInterval={2000}
                    responsive={this.responsive}
                    autoPlayActionDisabled={true}
                    dotsDisabled={true}
                    buttonsDisabled={true}
                    mouseDragEnabled={true}
                  />

        );
    }
};

export default BrandCarousel