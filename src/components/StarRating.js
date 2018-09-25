import React, { Component } from 'react';
import Rating from 'react-rating';

class StarRating extends Component {
    render() {
        return(
            <div>
            <Rating
                emptySymbol="fa fa-star-o"
                fullSymbol="fa fa-star"
                fractions={2}
            />
            <span> 4.2 | 3 customer reviews</span>
            </div>
        );
    }
}

export default StarRating;