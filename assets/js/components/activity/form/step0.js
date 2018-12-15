import React from 'react';
import ComboBoxCategory from '../../shared/category/ComboBoxCategory';

const FormActivityStep0 = (props) => {
    const {handleChange,activity } = props
    return (
                <ComboBoxCategory selected={activity.category} onChange={handleChange} />
    );
}

export default FormActivityStep0;