import React, { Component } from 'react'
import CategoryListItem from './category-list';
import { fetchAllCategory } from '../../actions/category';
import { connect } from 'react-redux';

class CategoryResource extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        
        this.props.fetchAll();
        
    }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        this.setState({
            categories:nextProps.data
        })

    }

    
    render() { 
        if(this.state.categories)
        return ( 
            <CategoryListItem list={this.state.categories}></CategoryListItem>
        );
        else return(<h1>Chargement...</h1>)
    }
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchAll: () => {
            dispatch(fetchAllCategory())
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    
    return {
        data: state.category.data,
        loading:state.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryResource)
