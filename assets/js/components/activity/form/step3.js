import React from 'react';
import TextField from '@material-ui/core/TextField';

const FormActivityStep3 = (props) => {
    const { classes, handleChange , activity} = props
    return (
        <div className="row">
            <div className="col-md-12">
                <TextField
                    required
                    onChange={handleChange}
                    id="people"
                    label="Nombre de personnes"
                    type="number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    defaultValue={activity.people}
                />
                <TextField
                    required
                    onChange={handleChange}
                    id="ageMin"
                    label="Age minimum"
                    type="number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    defaultValue={activity.ageMin}
                />
                <TextField
                    required
                    onChange={handleChange}
                    id="ageMax"
                    label="Age maximum"
                    type="number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    defaultValue={activity.ageMax}
                />
                </div>

        </div>
    );
}

export default FormActivityStep3;