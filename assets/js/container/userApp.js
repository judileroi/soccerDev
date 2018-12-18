import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import Navigation from '../components/shared/navigation'
import RouterAdmin from '../routing/admin';
import BannerAdmin from '../components/admin/banner';
import { history } from '../store'
import { connect } from 'react-redux';
import { ToastContainer, ToastStore } from 'react-toasts';
const customContext = React.createContext(null)
class UserApp extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    UNSAFE_componentWillUpdate(props) {
        if (!props.message.stop) {

            switch (props.message.type) {
                case 'success':
                    ToastStore.success(props.message.message)

                    break;

                case 'error':
                    ToastStore.error(props.message.message)

                    break;

                case 'warning':
                    ToastStore.warning(props.message.message)

                    break;
            }
        }

    }

    navigateTo = (location) => {
        this.props.navigateTo(location)
    }


    render() {
        console.log(this.props);

        return (
            <div>

                <ConnectedRouter history={history} context={customContext}>

                    <div>
                    <header>
                            <Navigation context={this.context} userActive={true} />
                        </header>
                        <BannerAdmin />
                        <div className="container">
                            <RouterAdmin />
                        </div>
                    </div>
                </ConnectedRouter>
                <ToastContainer store={ToastStore} />

            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        message: state.message
    }
}

export default connect(mapStateToProps, null)(UserApp)
