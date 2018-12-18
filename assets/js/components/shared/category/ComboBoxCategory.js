import React, { Component } from 'react'
import { fetchAllCategory } from '../../../actions/category';
import { connect } from 'react-redux';

class ComboBoxCategory extends Component {
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

    handleChangeSelect = event=>{
        
        this.props.onChange(event)
    }

    render() {
        const {selected} = this.props
            return (
                <div>
                    <select id="category-select" value={selected} onChange={this.handleChangeSelect} className="chosen-select"  >
                        <option key="0" value="0" >--Choisir une catégorie--</option>

                        {
                            this.state.data.map(category => {
                          
                                return (<option  key={category.id}  value={category.id}>{category.name}</option>)
                               
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
export default connect(mapStateToProps, mapDispatchToProps)(ComboBoxCategory)
