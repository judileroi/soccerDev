import React from 'react';
import TextField from '@material-ui/core/TextField';

const FormActivityStep1Bis = (props) => {
    const {activity,  classes} = props
    return (
        <TextField
        id="outlined-address-input"
        label="Addresse"
        autoComplete="false"
        placeholder="Renseigner addresse d'organisation"
        className={classes.textField}
        type="number"
        name="address"
        fullWidth
        margin="normal"
        variant="outlined"
    />

    );
}

export default FormActivityStep1Bis;