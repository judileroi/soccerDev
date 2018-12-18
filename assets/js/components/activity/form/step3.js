import React from 'react';
import { TextField } from 'react-md';

const FormActivityStep3 = (props) => {
    const { classes, handleChange , activity} = props
    return (
        <div className="row">
            <div className="col-md-12">
                <TextField
                    required
                            onChange={(v,e)=>{handleChange(e)}}

                    id="people"
                    label="Nombre de personnes"
                    type="number"
                    className={classes.textField}
                    defaultValue={activity.people}
                />
                <TextField
                    required
                     onChange={(v,e)=>{handleChange(e)}}
                    id="ageMin"
                    label="Age minimum"
                    type="number"
                    className={classes.textField}
                    defaultValue={activity.ageMin}
                />
                <TextField
                    required
                    onChange={(v,e)=>{handleChange(e)}}
                    id="ageMax"
                    label="Age maximum"
                    type="number"
                    className={classes.textField}
                    defaultValue={activity.ageMax}
                />
                </div>

        </div>
    );
}

export default FormActivityStep3;