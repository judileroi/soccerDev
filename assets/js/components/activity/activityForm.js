
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux';

import FormStep from './formStep';
import PhotoService from '../../services/photo';
import ActivityService from '../../services/activities';

import { toastBox } from '../../toast';
import { messageEvent } from '../../actions/message';
import timestamp from '../../lib/timetampNow'
import { push } from 'connected-react-router';

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

const getSteps = () => {
  return ["Type d'activité", 'Quand ? ', 'Où ?', 'Présentation', 'Caractéristiques', 'Quelques Photos'];
}



class ActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      activity: {
        title: null,
        description: null,
        place: null,
        people: 0,
        ageMin: 10,
        ageMax: 100,

        date:null,
        time:null,
        category: 0
      },
      photos:[],
      dropzone: null,
      disabled: true

    }
  }

  nextValidate = (etat) => {
    const { activity, activeStep } = this.state
    switch (activeStep) {

      case 0:
        if (activity.category != 0)
          return false
        break;

      case 1:
        if (activity.date && activity.time)
          return false
        break;

      case 2:
        if (activity.place)
          return false
        break;

      case 3:
        if (activity.title && activity.description)
          return false
        break;

      case 4:
        if (parseInt(activity.people) > 0 && parseInt(activity.ageMin) >= 10 && parseInt(activity.ageMax) <= 100)
          return false
        break;
      case 5:
        if (this.state.dropzone) {
          if (this.state.dropzone.files.length > 0)
            return false
          // console.log(this.state.dropzone.files);
        }
        break;
    }
    return true
  }

  /** Upload State for fields */
  handleSetState = (event) => {
    var activity = this.state.activity
    switch (event.target.id) {
      case 'title':
        this.setState({
          activity: Object.assign({}, activity, { title: event.target.value }),
        }, () => {
          this.setState({
            disabled: this.nextValidate()
          })
        })
        break;

      case 'description':
        this.setState({
          activity: Object.assign({}, activity, { description: event.target.value }),

        }, () => {
          this.setState({
            disabled: this.nextValidate()
          })
        })
        break;

      case 'place':
        this.setState({
          activity: Object.assign({}, activity, { place: event.target.value }),

        }, () => {
          this.setState({
            disabled: this.nextValidate()
          })
        })
        break;
      case 'people':
        this.setState({
          activity: Object.assign({}, activity, { people: event.target.value }),

        }, () => {
          this.setState({
            disabled: this.nextValidate()
          })
        })
        break
      case 'ageMin':
        this.setState({
          activity: Object.assign({}, activity, { ageMin: event.target.value }),

        }, () => {
          this.setState({
            disabled: this.nextValidate()
          })
        })
        break
      case 'ageMax':
        this.setState({
          activity: Object.assign({}, activity, { ageMax: event.target.value }),

        }, () => {
          this.setState({
            disabled: this.nextValidate()
          })
        })
        break;
      case 'category-select':
        this.setState({
          activity: Object.assign({}, activity, { category: event.target.value }),
        }, () => {
          this.setState({
            disabled: this.nextValidate()
          })
        })
        break;

    }
  }


    /** Upload State For Date */
    handleSetStateForDates = (date) => {
      var activity = this.state.activity
      
      this.setState({
        activity: Object.assign({}, activity, { date: date}),  
      },()=>{
        this.setState({
          disabled: this.nextValidate()
        })
      })
    }

      /** Upload State For Date */
      handleSetStateForTimes = (time) => {
        
        var activity = this.state.activity
        this.setState({

          activity: Object.assign({}, activity, { time: time}),
    
        },()=>{
          this.setState({
            disabled: this.nextValidate()
          })

        })
      }

  /** Upload State Dropzone  */
  handleSetDropZoneState = (dz) => {
    this.setState({
      dropzone: dz,
    }, () => {
      this.setState({
        disabled: this.nextValidate(),
        photos:dz.files
      })
    });
  };

  handleNext = () => {

    this.setState(state => ({
      activeStep: state.activeStep + 1

    }), () => {


      this.setState({
        disabled: this.nextValidate()
      })
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }), () => {
      this.setState({
        disabled: this.nextValidate()
      })
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  uploadPhoto=photo=>{
      PhotoService.uploadPhoto(photo).then(res => {
        console.log(res);

      }).catch(error => {
        console.log('Error');
      })
  }

  handleSend = () => {
    var { activity, photos } = this.state

    activity = Object.assign({}, activity, { category: '/api/categories/' + activity.category })
    activity = Object.assign({}, activity, { people: parseInt(activity.people) })
    activity = Object.assign({}, activity, { ageMax: parseInt(activity.ageMax) })
    activity = Object.assign({}, activity, { ageMin: parseInt(activity.ageMin) })
    activity = Object.assign({}, activity, { time: activity.time.getHours()+':'+activity.time.getMinutes() })
    var photos_all = photos

    /** Save  */
    ActivityService.saveActivity(activity).then(res => {

      photos_all.map(p => {
        var photoSave = {
          dataURL: p.dataURL,
          created: timestamp.toString(),
          activity: res.data.id,
          category:null
        }        
        this.uploadPhoto(photoSave)
      })


      this.props.navigateTo('/admin/list-activity')
      
      this.props.messageEvent(toastBox.activity.label,toastBox.activity.create,'success',0)
      
    }).catch(err => {
      console.log(err);
      this.props.messageEvent(toastBox.activity.label,toastBox.activity.error,'error',0)

    })

  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, activity, dropzone, disabled } = this.state;
    return (

      <div className={classes.root}>
        <div className="add-listing-section">

          <div className="add-listing-headline">
            <h3><i className="sl sl-icon-doc"></i> Création d'activité</h3>
          </div>


          <div className="row with-forms">

            <div className="col-md-12">
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                      <StepContent>
                        <FormStep
                          index={index}
                          activity={activity}
                          handleSetState={this.handleSetState}
                          handleSetStateForDates={this.handleSetStateForDates}
                          handleSetDropZoneState={this.handleSetDropZoneState}
                          handleSetStateForTimes={this.handleSetStateForTimes}

                          dropzone={dropzone}
                        />
                        <div >
                          <div>
                            <a
                              disabled={activeStep === 0}
                              onClick={this.handleBack}
                              className={activeStep === 0 ? ' hidden' : 'button  with-icon'}
                            >
                              <i className="fa fa-arrow-circle-left"></i> Précédent
                        </a>
                            <a
                              variant="contained"
                              color="secondary"
                              onClick={this.handleNext}
                              className={!disabled ? "button  with-icon" : " hidden "}
                            >
                              {activeStep === steps.length - 1 ? 'Finish ' : 'Suivant '}
                              <i className="fa fa-arrow-circle-right"></i>
                            </a>
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
                  <Button onClick={this.handleReset} className="button disabled  with-icon">Annuler <i className="fa fa-undo"></i></Button>
                  <Button onClick={this.handleSend} className="button  with-icon">Valider <i className="fa fa-check"></i></Button>
                </Paper>
              )}
            </div>



          </div>

        </div>

      </div>
    );
  }
}

ActivityForm.propTypes = {
  classes: PropTypes.object,
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    messageEvent: (entity,message,type,stop) => {
          dispatch(messageEvent(entity,message,type,stop))
      },
    navigateTo: (location) => {
        dispatch(push(location))
    }
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(ActivityForm))
