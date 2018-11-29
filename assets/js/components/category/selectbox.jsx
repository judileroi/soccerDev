import React, { Component } from 'react'
import { fetchAllCategory } from '../../actions/category';
import { connect } from 'react-redux';

class CategorySelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
    }
    componentDidMount() {
        this.props.fetchAll()
    }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        })
    }

    render() {
            return (
                <div className="main-search-input-item">
                    <select data-placeholder="All Categories" className="chosen-select" >
                        <option key="0">All Categories</option>

                        {
                            this.state.data.map(category => {
                                return (<option key={category.id} value={category.id}>{category.name}</option>)
                            })
                        }
                    </select>
                </div>
            );

    }
}



const mapStateToProps = (state, ownProps) => {
    
    return {
        data: state.category.data
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchAll: () => {
            dispatch(fetchAllCategory())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategorySelectBox)
