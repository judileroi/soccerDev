
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import moment from 'moment'
import FormStep from './formStep';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  }
});

const getSteps = ()=>{
    return ["Type d'activité", 'Quand ? ','Où ?', 'Présentation', 'Caractéristiques', 'Quelques Photos'];
}



class ActivityForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeStep: 0,
            activity:{
              title:null,
              description:null,
              startDate: moment(),
              endDate: moment().add(1, 'day') ,
              category:0
            },
            dropzone:null,
            disabled:true

         }
    }

    nextValidate =()=>{
     const {activity,activeStep} = this.state
      switch(activeStep){

        case 0:
        if(activity.category!=0) 
        return false
        break;

        case 1:
        if(activity.startDate< moment() || activity.endDate <moment()) 
        return false

        break;

        case 2:
        break;

        case 3:
        break;

        case 4:
        break;
      }
      return false
    }

    /** Upload State for fields */
    handleSetState = (event)=>{
      var activity = this.state.activity
      switch(event.target.id){
        case 'title':
          this.setState({
            activity : Object.assign({},activity,{title:event.target.value}),
          },()=>{
            this.setState({          
              disabled:this.nextValidate()
            })
          })
          break;

          case 'description':
          this.setState({
            activity : Object.assign({},activity,{description:event.target.value}),

          },()=>{
            this.setState({          
              disabled:this.nextValidate()
            })
          })
          break;

          case 'category-select':
          this.setState({
            activity : Object.assign({},activity,{category:event.target.value}),
          },()=>{
            this.setState({          
              disabled:this.nextValidate()
            })
          })
          break;

      }
    }
    /** Upload State For Date */
    handleSetStateForDate =(range)=>{
      var activity = this.state.activity
      this.setState({
        activity : Object.assign({},activity,{startDate:range.selection.startDate , endDate:range.selection.endDate}),
        disabled:this.nextValidate()

      })  
    }
    /** Upload State Dropzone  */
    handleSetDropZoneState= (dz) => {
        this.setState({
          dropzone: dz,
        },()=>{
          // console.log('State Activity..');
          // console.log(this.state.dropzone);
          // console.log('State Activity..');

          
        });
      };
      handleNext = () => {
        this.setState(state => ({
          activeStep: state.activeStep +1

        }),()=>{
          this.setState({          
            disabled:this.nextValidate()
          })
        });
      };
      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1
        }),()=>{
          this.setState({          
            disabled:this.nextValidate()
          })
        });
      };
    
      handleReset = () => {
        this.setState({
          activeStep: 0,
        });
      };
    
    render() { 
      const { classes } = this.props;
      const steps = getSteps();
      const { activeStep,activity,dropzone, disabled } = this.state;
        return (  
          <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <FormStep 
                    index={index} 
                    activity ={activity}
                    handleSetState={this.handleSetState}
                    handleSetStateForDate={this.handleSetStateForDate}
                    handleSetDropZoneState={this.handleSetDropZoneState}
                    dropzone={dropzone}
                    />
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Précédent
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={this.handleNext}
                          className={classes.button}
                          disabled={disabled}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Suivant'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>All steps completed - you&quot;re finished</Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
        );
    }
}
 
ActivityForm.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ActivityForm);
