import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormActivityStep0 from './form/step0';
import FormActivityStep1 from './form/step1';
import FormActivityStep2 from './form/step2';
import FormActivityStep3 from './form/step3';
import FormActivityStep1Bis from './form/step1bis';
import FormActivityStep4 from './form/step4';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        fontSize: 16

    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },

});



class FormStep extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        };

        this.djsConfig = {
            addRemoveLinks: true,
            processingmultiple: false,
            acceptedFiles: "image/jpeg,image/jpg,image/png,image/gif"
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/upload'
        };
    }
    handleChange = event => {

        this.props.handleSetState(event)
    };

    changeDate = (range) => {
        this.props.handleSetStateForDate(range)

    }
    handleSetDropZoneState = dz => {

        if(dz.files.length > 0)
        this.props.handleSetDropZoneState(dz)
    }


    render() {
        const { classes } = this.props;
        const { index, activity,dropzone } = this.props;
        switch (index) {
            case 0:
                return <FormActivityStep0
                    handleChange={this.handleChange}
                    activity={activity}
                />
            case 1:
                return <FormActivityStep1
                    activity={activity}
                    changeDate={this.changeDate}
                />
            case 2:
                return <FormActivityStep1Bis
                    activity={activity}
                    classes={classes}
                    handleChange={this.handleChange}
                />
            case 3:
                return <FormActivityStep2
                    activity={activity}
                    classes={classes}
                    handleChange={this.handleChange}
                />

            case 4:
                return <FormActivityStep3
                    activity={activity}
                    classes={classes}
                    handleChange={this.handleChange}
                />

            case 5:
                return <FormActivityStep4
                    handleSetDropZoneState={this.handleSetDropZoneState}
                    dropzone={dropzone}

                />
        }

    }
}

FormStep.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormStep);
