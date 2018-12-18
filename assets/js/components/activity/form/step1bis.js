import React from 'react';
import { TextField } from 'react-md';

const FormActivityStep1Bis = (props) => {
    const {classes,handleChange,activity } = props
    console.log(activity);
    
    return (
        <TextField
        id="place"
        autoComplete="false"
        onChange={(v,e)=>{handleChange(e)}}
        label="Addresse"
        placeholder="Renseigner addresse d'organisation"
        fullWidth
        className={classes.textField}
        defaultValue={activity.place}
        margin="normal"
    />

    );
}

export default FormActivityStep1Bis;