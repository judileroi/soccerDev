import React, { Component } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { removeCategory, activeCategory } from '../../actions/category';

import timestampToDate from '../../lib/timestamp'
import CategoryService from '../../services/categories';

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.onDelete.bind(this)
    }
    onDelete = (id) => {
        this.props.remove(id)

    }

    onSelect = category => {
        CategoryService.getCategory(category).then(res=>{
            if(res.data.id)        
            this.props.select(res.data)

        })
    }

    render() {
        const { row, select } = this.props

        return (
            <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell numeric>{row.name}</TableCell>
                <TableCell numeric> {timestampToDate(row.created)}</TableCell>
                <TableCell>

                    <IconButton onClick={() => this.onSelect(row)}>
                        <Icon color="primary" >edit_circle</Icon>
                    </IconButton>

                    <IconButton onClick={() => this.onDelete(row.id)}>
                        <Icon color="secondary" >delete_circle</Icon>
                    </IconButton>

                </TableCell>
            </TableRow>
        );

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        remove: (id) => {
            dispatch(removeCategory(id))
        },
        active: (data) => {
            dispatch(activeCategory(data))
        }

    }
}

const mapStateToProps = (state) => {
    return {
        category_active: state.category.active
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)


