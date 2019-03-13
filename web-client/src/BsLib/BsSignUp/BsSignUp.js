import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import BsSignUpForm from './BsSignUpForm/BsSignUpForm';
import 'react-toastify/dist/ReactToastify.css';
import {
    unsignUser
} from '../../actions/signupTypes';

class BsSignUp extends Component {
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
            this.props.unsignUser();
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
                            Sign Up
                        </div>
                        <div className="bs-signin-subtitle">
                            Sign up today, it's free !
                        </div>
                        <BsSignUpForm />
                    </div>
                    <div className="bs-signin-changetologin">
                        Already have an account ?
                        <a href="/connect"> Log in !</a>
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
        user: state.sign.user,
        token: state.sign.token,
        error: state.sign.error
    }
}

export default withRouter(connect(mapStateToProps, {
    unsignUser
})(BsSignUp));