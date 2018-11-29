import React, { Component } from 'react'
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DropzoneComponent from 'react-dropzone-component';
import Icon from '@material-ui/core/Icon';
import Notifications, { notify } from 'react-notify-toast';

/** A Séparer */
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

/** A séparer après  */
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux';

import PhotoService from '../../services/photo';
import CategoryService from '../../services/categories';
import GridListImages from '../shared/grid-list';

const styles = theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function TabContainer(props) {
  return (
    <Typography component="div" className="tab-container">
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class CategoryDialog extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      category: {
        name: '',
        photos: []
      },
      disabled_valid: true,
      openDialog: false,
      edition: false,
      value: 0,
      uploadFiles:[]
    }


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

    this.dropzone = null;
  }

  addUpload = (file) => {

  }

  successUpload = file => {
    var photos = this.state.uploadFiles
    const dateTime = new Date().getTime();
    const timestamp = Math.floor(dateTime / 1000);
    photos.push(file)
    this.setState({
      uploadFiles: photos
    }, () => {
      console.log('Uploaded')
    })



  }

  removedUpload = file => {
    var photos = this.category.state.photos
    var photosNew = photos.filter(f => f.name != file.name)
    this.setState({
      category: Object.assign(this.state.category, {}, { photos: photosNew })
    })

  }



  /** Close Dialog */
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
    // this.initialize()
  };

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.

  componentWillReceiveProps(nextProps) {
    if (nextProps.edition)
      this.setState({
        category: nextProps.category,
        edition: nextProps.edition
      })
  }


  /** Control Input before validation */
  handleChange = event => {
    var category = Object.assign(this.state.category, {}, { name: event.target.value })
    var disabled_valid = (event.target.value.length > 0) ? false : true
    this.setState({
      category: category,
      disabled_valid: disabled_valid
    })
  }
  /** Change Tabs  */
  handleChangeTab = (event, value) => {
    this.setState({ value });
  };


  /** Validation Control */
  onCreate = () => {
    const dateTime = new Date().getTime();
    const timestamp = Math.floor(dateTime / 1000);
    var photo_all = this.state.uploadFiles
    var category_all = this.state.category

    var category_without_photos = Object.assign(category_all, {}, { created: timestamp, photos: [] })


    /** Save Category */
    if (!this.state.edition) {
      CategoryService.saveCategory(category_without_photos).then(res => {
        var categoryuuid = res.data.id
        // notify.show('Catégorie enregistrée avec succès !', "success", 2000);

        photo_all.map(p => {
          var photoSave ={
            dataURL : p.dataURL,
            created: timestamp,
            category:categoryuuid
          }

          PhotoService.uploadPhoto(photoSave).then(res => {
            console.log(res);
            
          }).catch(error => {
            console.log('Error');
          })
        })


      }).catch(error => {
        throw (error)
      })
    }
    else {
      CategoryService.updateCategory(category_without_photos).then(res => {
        var categoryuuid = '/api/categories/' + res.data.id
        notify.show('Catégorie enregistrée avec succès !', "success", 2000);



        /** Add New Photos */
        photo_all.map(p => {
          PhotoService.uploadPhoto(Object.assign(p, {}, { category: categoryuuid })).then(res => {
            if (res.status = 201) {
              var phot = Object.assign(p, {}, { category: categoryuuid, path: res.data.path });
              PhotoService.savePhoto(phot).then(res => {
                notify.show('Photos mis à jour avec succès !', "success", 2000);

              })
            }

          }).catch(error => {
            console.log('Error');

          })
        })


      }).catch(error => {
        throw (error)
      })
    }

    this.handleClose()


    // if (!this.state.edition)
    //   this.props.create(this.state.category)
    // else
    //   this.props.update(this.state.category)
    //     ;



  }

  render() {
    const { category, open, photos } = this.props;
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const { value } = this.state;



    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      drop: this.callbackArray,
      addedfile: this.addUpload,
      success: this.successUpload,
      removedfile: this.removedUpload
    }
    return (

      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}  >
        <DialogTitle id="simple-dialog-title">{!this.state.edition ? 'Création d\'une catégorie' : 'Edition  d\'une catégorie'}</DialogTitle>
        <DialogContent className="dialog" >

          <DialogContentText>

            Tous les champs avec (*) sont obligatoires !
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Designation (*)"
            type="email"
            value={this.state.category.name}
            onChange={this.handleChange}
            fullWidth
          />
          <div >
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={this.handleChangeTab}
                textColor="primary"
              >
                <Tab label="Ajouter des photos" />
                <Tab label="Album photos" />
              </Tabs>
            </AppBar>
            {value === 0 &&
              <TabContainer>
                <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
              </TabContainer>}
            {value === 1 && <TabContainer>

              <GridListImages images={photos}></GridListImages>
            </TabContainer>}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary">

            <Icon color="secondary" >cancel</Icon>
            ANNULER
            </Button>

          <Button onClick={this.onCreate} disabled={this.state.disabled_valid} color="primary">
            <Icon color="primary" >save</Icon>
            VALIDER
            </Button>

        </DialogActions>
      </Dialog>
    );
  }
}

CategoryDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const mapStateToProps = (state) => {

  return {
    category_active: state.category.active,
    last_uri_photo: state.photo.last_uri
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(CategoryDialog))
