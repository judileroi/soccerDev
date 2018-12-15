import React from 'react';
import DropPhotoToUpload from '../../shared/dropPhotoToUpload';

const FormActivityStep4 = (props) => {

    const djsConfig = {
        addRemoveLinks: true,
        processingmultiple: false,
        acceptedFiles: "image/jpeg,image/jpg,image/png,image/gif"
    };

    const componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: '/upload'
    };
    const {handleSetDropZoneState,dropzone} = props

    return (
        <div className="row">
            <div className="col-md-12">
                <DropPhotoToUpload config={componentConfig} dropzone={dropzone} handleSetDropZoneState={handleSetDropZoneState} djsConfig={djsConfig} />
            </div>

        </div>
    );
}

export default FormActivityStep4;