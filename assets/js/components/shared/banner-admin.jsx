import React from 'react';

const BannerAdmin = (props) => {
    const { title, path } = props
    return (
        <div id="titlebar">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <h2>{title}</h2>

                        <nav id="breadcrumbs">
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li>{title}</li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerAdmin;