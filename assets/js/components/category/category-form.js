import React, { Component } from 'react'
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DropzoneComponent from 'react-dropzone-component';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import { addCategory, updateCategory } from '../../actions/category';
import { connect } from 'react-redux';
import Photo from '../../actions/photos';
import PhotoService from '../../services/photo';
import CategoryService from '../../services/categories';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
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
      edition: false
    }


    this.djsConfig = {
      addRemoveLinks: true,
      processingmultiple: false,
      maxFiles: 3,
      uploadMultiple: false,
      acceptedFiles: "image/jpeg,image/png,image/gif"
    };

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: '/upload'
    };

    this.dropzone = null;
  }

  addUpload = () => {

  }

  successUpload = file => {
    var photos = this.state.category.photos
    const dateTime = new Date().getTime();
    const timestamp = Math.floor(dateTime / 1000);
    console.log(file);
    
    photos.push({
      path: file.dataURL,
      created: timestamp,
      name:file.name
    })

    /** Mis à jour des photos */
    var categorieNew = Object.assign(this.state.category,{},{photos:photos});

    
    this.setState({
      category: categorieNew
    })

  }

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
    
  }
  removedUpload = file => {
    var photos = this.category.state.photos
    var photosNew = photos.filter(f => f.name != file.name)
    this.setState({
      category: Object.assign(this.state.category,{},{photos:photosNew})
    })

  }
  /** Close Dialog */
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
    // this.initialize()
  };

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {

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



  /** Validation Control */
  onCreate = () => {
    const dateTime = new Date().getTime();
    const timestamp = Math.floor(dateTime / 1000);
    var photo_all = this.state.category.photos
    var category_all = this.state.category

    var category_without_photos = Object.assign(category_all, {}, { created: timestamp, photos:[] })
    console.log(photo_all);


    /** Save Category */
      if (!this.state.edition){
        CategoryService.saveCategory(category_without_photos).then(res => {
          var categoryuuid = '/api/categories/' + res.data.id
                    /** Add New Photos */

          photo_all.map(p=>{
            PhotoService.uploadPhoto(Object.assign(p, {}, { category: categoryuuid })).then(res=>{
              if(res.status=201){
                var phot =Object.assign(p, {}, { category: categoryuuid, path:res.data.path });
                PhotoService.savePhoto(phot).then(res=>{
                  console.log('Sauvegardé');
                  
                })
              }
              
            }).catch(error=>{
              console.log('Error');
              
            })
          })
    
    
        }).catch(error => {
          throw (error)
        })
      }
      else{
        CategoryService.updateCategory(category_without_photos).then(res => {
          var categoryuuid = '/api/categories/' + res.data.id
          
          /** Add New Photos */
          photo_all.map(p=>{
            PhotoService.uploadPhoto(Object.assign(p, {}, { category: categoryuuid })).then(res=>{
              if(res.status=201){
                var phot =Object.assign(p, {}, { category: categoryuuid, path:res.data.path });
                PhotoService.savePhoto(phot).then(res=>{
                  console.log('Sauvegardé');
                  
                })
              }
              
            }).catch(error=>{
              console.log('Error');
              
            })
          })
    
    
        }).catch(error => {
          throw (error)
        })
      }



    // if (!this.state.edition)
    //   this.props.create(this.state.category)
    // else
    //   this.props.update(this.state.category)
    //     ;

  //  this.handleClose()


  }

  


  render() {
    const { classes, onClose, selectedValue, open } = this.props;
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

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


          <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            ANNULER
            </Button>
          <Button onClick={this.onCreate} disabled={this.state.disabled_valid} color="primary">
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    create: (category) => {
      dispatch(addCategory(category))
    },
    update: (category) => {
      dispatch(updateCategory(category))
    },
    addPhoto: (photo) => {
      dispatch(Photo.uploadAndadd(photo))
    }
  }
}
const mapStateToProps = (state) => {

  return {
    category_active: state.category.active,
    last_uri_photo: state.photo.last_uri
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryDialog))
