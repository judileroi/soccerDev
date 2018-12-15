import React from 'react';
import ComboBoxCategory from '../../shared/category/ComboBoxCategory';
import TextField from '@material-ui/core/TextField';
import DateRangePickerWrapper from '../../../plugins/datePickerRange';

const FormActivityStep3 = (props) => {
    const {classes,handleChange} = props
    return (
        <div className="row">
            <div className="col-md-12">

                    <TextField
                        id="outlined-people-input"
                        label="Nombre de personnes"
                        className={classes.textField}
                        type="number"
                        name="people"
                        defaultValue='10'
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-age-min-input"
                        label="Age minimum"
                        className={classes.textField}
                        type="number"
                        defaultValue='10'
                        name="ageMin"
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-age-max-input"
                        label="Age maximum"
                        className={classes.textField}
                        type="number"
                        defaultValue='75'
                        name="ageMax"
                        margin="normal"
                        variant="outlined"
                    />            </div>

        </div>
    );
}

export default FormActivityStep3;