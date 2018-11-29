import React from 'react';
import PropTypes from 'prop-types';
import CategorySliderItem from './category-slider-items';

const CategorySlider = ({ categories }) => {
    var modulo = 3
    var column = ""
    return (
        <div className="container">

            <div className="row">
 
                {
                    categories.map((categorie, index) => {

                        if (index % modulo == 0 && index != 6) {
                            column = "col-md-8"
                        } else {
                            column = "col-md-4"

                        }
                        return (
                            <CategorySliderItem key={categorie.id} column={column} categorie={categorie}></CategorySliderItem>
                        )
                    })
                }

            </div>
        </div>
    );
}

CategorySlider.propTypes = {
    categories: PropTypes.array.isRequired,
}

export default CategorySlider;