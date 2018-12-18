import React from 'react';
import { TextField } from 'react-md';

const FormActivityStep2 = (props) => {
    const {classes,handleChange,activity} = props
    return (
        <div className="row">
        <div className="col-md-12">
                <TextField
                    required
                            onChange={(v,e)=>{handleChange(e)}}

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
                    onChange={(v,e)=>{handleChange(e)}}
                    defaultValue={activity.description}
                    className={classes.textField}
                    margin="normal"
                    rows={3}
                    variant="outlined"
                />
        </div>
        </div>
    );
}

export default FormActivityStep2;