import React from 'react';
import TextField from '@material-ui/core/TextField';

const FormActivityStep1Bis = (props) => {
    const {classes,handleChange,activity } = props
    return (
        <TextField
        id="place"
        label="Addresse"
        autoComplete="false"
        onChange={handleChange}
        placeholder="Renseigner addresse d'organisation"
        fullWidth
        className={classes.textField}
        variant="outlined"
        defaultValue={activity.place}
        margin="normal"
    />

    );
}

export default FormActivityStep1Bis;