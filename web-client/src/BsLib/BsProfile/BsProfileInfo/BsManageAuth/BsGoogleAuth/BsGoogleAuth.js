import React, { Component } from 'react';
import { googleLink } from './../../../../../Apis/googleAuth';
import { connect } from 'react-redux';
import {
	profileConnectGoogle
} from './../../../../../actions/profileTypes';

class BsGoogleAuth extends Component {
	componentWillMount = () => {
		if (window.location.href !== "http://localhost:8081/profile") {
			if (window.location.href.search("https://www.googleapis.com/auth")) {
				let begin = window.location.href.search('code=') + 5;
				let end = window.location.href.search("&scope=");
				let code = window.location.href.slice(begin, end);
				let bearer = localStorage.getItem("userToken");

				this.props.profileConnectGoogle(bearer, code);
			}
		}
	}

	render() {
		return (
			<div className="BsAuthButton-container">
				<div className="BsAuthButton">
					<img src="https://i.imgur.com/4ee7XM7.png" alt="Google" className="BsAuthButtonImage"/>
					<a href={googleLink} className="BsGoogleAuth-a" >
						Connect your google account
					</a>
				</div>
			</div>
		)
	}
}

export default connect(null, {
	profileConnectGoogle
})(BsGoogleAuth)