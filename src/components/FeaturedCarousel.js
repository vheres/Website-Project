import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Thumbnail } from 'react-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { Link } from 'react-router-dom';
 
class FeaturedCarousel extends Component {
    state = {featured: []}
    componentWillMount() {
        this.getFeaturedList()
    }

    getFeaturedList() {
        axios.get(`${API_URL_1}/featured`)
        .then((response) => {
            this.setState({featured: response.data.featured})
        }).catch((err) => {
            console.log(err)
        })
    }

    responsive = {
        0: { items: 3 },
        1080: { items: 5 }
      };
      
      galleryItems() {
          var images = [];
          this.state.featured.map((item,count) => {
            images.push([item.id, item.link, item.name, item.price])
          })
          console.log(images)
        return (
          images.map((item, i) => (
            //   <a href={`/detail?id=${item[0]}`} onClick={()=>this.props.FeaturedClick(`/detail?id=${item[0]}`)} className="featured-holder"><img src={item[1]} style={{width:"100%"}}></img><div className="featured-overlay">{item[2]}<br/>${item[3]}</div></a>
              <Link to={`/detail?id=${item[0]}`} onClick={()=>this.props.FeaturedClick(`/detail?id=${item[0]}`)} className="featured-holder"><img src={item[1]} style={{width:"100%"}}></img><div className="featured-overlay">{item[2]}<br/>${item[3]}</div></Link>
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

export default FeaturedCarousel