import React from 'react';
import CategorySelectBox from '../category/selectbox';

const MainSearch = (props) => {
    return (
        <div className="main-search-container dark-overlay">
            <div className="main-search-inner">

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Find Nearby Attractions</h2>
                            <h4>Expolore top-rated attractions, activities and more</h4>

                            <div className="main-search-input">

                                <div className="main-search-input-item">
                                    <input type="text" placeholder="What are you looking for?"  />
                                </div>

                                <div className="main-search-input-item location">
                                    <input type="text" placeholder="Location"  />
                                    <a href="#"><i className="fa fa-dot-circle-o"></i></a>
                                </div>
                                
                                <CategorySelectBox></CategorySelectBox>

                                <button className="button">Search</button>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="video-container">
                <video poster="theme/images/main-search-video-poster.jpg" >
                </video>
            </div>

        </div>
    );
}

export default MainSearch;