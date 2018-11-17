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
        name: ''
      },
      photos:[],
      photos_uri:[],
      files: [],
      disabled_valid: true,
      openDialog: false,
      edition: false
    }


    this.djsConfig = {
      addRemoveLinks: true,
      processingmultiple: true,
      acceptedFiles: "image/jpeg,image/png,image/gif"
    };

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: '/upload'
    };

    this.dropzone = null;
  }

  addUpload=()=>{

  }
  successUpload = file =>{
    var files = this.state.files
    var photos = this.state.photos
    const dateTime = new Date().getTime();
    const timestamp = Math.floor(dateTime / 1000);
        photos.push({
          path:file.name,
          created:timestamp,
          base64:file.dataURL
        })
    
    files.push(file)

    this.setState({
      files:files,
      photos:photos
    })

  }
  removedUpload = file =>{
    var files = this.state.files
    var filesNew = files.filter(f=>f.upload.uuid != file.upload.uuid )
    this.setState({
      files:filesNew
    })
    
  }
  /** Close Dialog */
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
    // this.initialize()
  };

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
   componentWillReceiveProps(nextProps) {    
     if(nextProps.photos) console.log(nextProps.photos);
     
    this.setState({
      category: nextProps.category,
      edition: nextProps.edition
    })
  }
  
  componentWillUpdate(){


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
    var category = Object.assign(this.state.category, {}, { created: timestamp })
        
    this.setState({
      category: category
    })

    this.state.photos.map(photo=>{      
      this.props.addPhoto(photo)
    })
    
    
    // if (!this.state.edition)
    //   this.props.create(this.state.category)
    // else
    //   this.props.update(this.state.category)
    //     ;

   // this.handleClose()


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
    addPhoto:(photo) =>{
      dispatch(Photo.uploadAndadd(photo))
    }
  }
}
const mapStateToProps = (state) => {

  return {
    category_active: state.category.active,
    last_uri_photo:state.photo.last_uri
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(CategoryDialog))
