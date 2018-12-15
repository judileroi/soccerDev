import React from 'react';
import PropTypes from 'prop-types';

import DropzoneComponent from 'react-dropzone-component';

/** This component help to drop photos and upload in any form*/

class DropPhotoToUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }

        this.dropzone = null
    }

    addUpload = file => {
        this.props.handleSetDropZoneState(this.dropzone);

    }

    successUpload = file => {
        var photos = this.state.photos
        photos.push(file)
        this.setState({
            photos: photos
        }, () => {
            console.log('Uploaded')
        })

    }

    removedUpload = file => {
        var photos = this.state.photos
        photos = photos.filter(f => f.name != file.name)
        this.setState({
            photos: photos
        })

    }
  
    //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
    // componentWillUpdate(nextProps, nextState) {
        
    //     console.log(nextProps.dropzone);
    // }
    render() {
        const {  djsConfig, config,dropzone } = this.props
        
        const eventHandlers = {
            init: dz => {
                if(dropzone) dz = dropzone
                return(this.dropzone=dz)
            },
            addedfile: this.addUpload,
            success: this.successUpload,
            removedfile: this.removedUpload
        }
        
        return (
            <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />

        );
    }
}

// DropPhotoToUpload.prototype = {
//     djsConfig: PropTypes.object.isRequired,
//     config: PropTypes.object.isRequired
// }

export default DropPhotoToUpload