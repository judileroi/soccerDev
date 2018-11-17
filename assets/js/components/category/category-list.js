import React, { Component } from 'react'
import CategoryItem from './category-item';
import CategoryDialogWrapped from './category-form';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Notifications, { notify } from 'react-notify-toast';
import { fetchAllCategory } from '../../actions/category';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const classes = theme => ({
  root: {
    width: '40%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class CategoryListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      category_active: null,
      photos_active: null,
      edition: false

    }
  }


  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    if (nextProps.category_active) this.setState({ category_active: nextProps.category_active })
    if (nextProps.photos_active) this.setState({ photos_active: nextProps.photos_active })

  }
  handleClickOpen = () => {
    this.setState({
      openDialog: true,
      category_active: this.initialize(),
      edition: false,
      photos_active:[]
    });
  };

  initialize = () => {
    return {
      name: '',
      created: 0
    }
  }


  handleClose = value => {
    this.props.fetchAll();
    this.setState({ openDialog: false, edition: false });
  };

  isActive = data => {
    if (data) {
      this.setState({ openDialog: true, category_active: data, edition: true });

    }
  }

  render() {
    return (<Paper className="container">
      <Notifications />

      <IconButton onClick={this.handleClickOpen}>    
        <Icon color="primary" fontSize="large">add_circle</Icon>
      </IconButton>

      <CategoryDialogWrapped
        open={this.state.openDialog}
        onClose={this.handleClose}
        category={this.state.category_active}
        photos={this.state.photos_active}
        edition={this.state.edition}
      ></CategoryDialogWrapped>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>#REF</TableCell>
            <TableCell >NOM</TableCell>
            <TableCell numeric>CRÉER LE </TableCell>
            <TableCell numeric>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            this.props.list.map((category) => {
              return (
                <CategoryItem key={category.id} row={category} select={this.isActive} ></CategoryItem>
              )
            })
          }
        </TableBody>
      </Table>
    </Paper>);
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAll: () => {
      dispatch(fetchAllCategory())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    category_active: state.category.active,
    last_uri_photo:state.photo.last_uri

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryListItem)
