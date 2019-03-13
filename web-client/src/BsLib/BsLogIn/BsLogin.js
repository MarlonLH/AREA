import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import BsLogInForm from './BsLogInForm/BsLogInForm'
import {
    unlogUser
} from '../../actions/loginTypes';
import 'react-toastify/dist/ReactToastify.css';

class BsLogin extends Component {
	componentWillMount = () => {
        let currentUser = JSON.parse(localStorage.getItem("connectedUser"))
        if (this.props.user || currentUser)
            this.props.history.push('/');
	}

    notifyError = () => {
        toast.error(this.props.error, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    handleUserInSignup = (currentUser) => {
        if (this.props.user && !currentUser) {
			localStorage.setItem("connectedUser", JSON.stringify(this.props.user))
			localStorage.setItem("userToken", this.props.token)
			this.props.unlogUser();
			this.props.history.push('/');
        }
        if (this.props.user || currentUser)
            this.props.history.push('/');
    }

	render() {
        let currentUser = localStorage.getItem("connectedUser");

        if (this.props.error)
            this.notifyError();
        if (this.props.user || currentUser)
			this.handleUserInSignup(currentUser);

		return (
			<div className="bs-signin">
				<div className="bs-signin-main">
					<div className="bs-signin-container">
						<div className="bs-signin-title">
							Log In
						</div>
						<div className="bs-signin-subtitle">
							Use your account to log in !
						</div>
						<BsLogInForm />
					</div>
					<div className="bs-signin-changetologin">
						You need an account ?
						<a href="/join"> Sign up !</a>
					</div>
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnVisibilityChange
						draggable
						pauseOnHover
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
		user: state.log.user,
		token: state.log.token,
        error: state.log.error
    }
}

export default withRouter(connect(mapStateToProps, {
	unlogUser
})(BsLogin));
