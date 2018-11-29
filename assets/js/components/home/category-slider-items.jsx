import React,{Component} from 'react';
import PropTypes from 'prop-types';
import PhotoService from '../../services/photo';
import CONFIG_APP from '../../config';

class CategorySliderItem extends Component {

    constructor(props){
        super(props);
        this.state ={
            photo:{}
        }
    }
    componentDidMount() {
        if(this.props){

            console.log(this.props.categorie.photos[0]);
            var photoId = this.props.categorie.photos[0]

            PhotoService.getPhoto(photoId).then(res=>{
                
                this.setState({
                    photo:res.data
                })
            })
        }

    }
    
    render() { 
        const {photo} = this.state
        const {categorie,column} = this.props
        return (         
        <div className={column}>

        <a 
            href="listings-list-with-sidebar.html" 
            className="img-box"      
            style = {{ backgroundImage: 'url(' + CONFIG_APP.website_url+'/uploads/'+photo.path + ')', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }}>
            <div className="img-box-content visible">
                <h4>{categorie.name} </h4>
                <span>{categorie.activities.length} Listings</span>
            </div>
        </a>

    </div>	
 );
    }
}


CategorySliderItem.propTypes = {
    categorie: PropTypes.object.isRequired
}

export default CategorySliderItem;