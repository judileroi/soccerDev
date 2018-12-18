import React from 'react';
import TextField from '@material-ui/core/TextField';

const FormActivityStep2 = (props) => {
    const {classes,handleChange,activity} = props
    return (
        <div className="row">
        <div className="col-md-12">
                <TextField
                    required
                    onChange={handleChange}
                    id="title"
                    label="Titre"
                    fullWidth
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    defaultValue={activity.title}
                />
                <TextField
                    required
                    id="description"
                    label="Description"
                    fullWidth
                    multiline
                    onChange={handleChange}
                    defaultValue={activity.description}
                    className={classes.textField}
                    margin="normal"
                    rows="20"
                    variant="outlined"
                />
        </div>
        </div>
    );
}

export default FormActivityStep2;