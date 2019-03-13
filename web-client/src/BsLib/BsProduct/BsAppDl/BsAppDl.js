import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ToDl from './../../../apk/client.apk';

class BsAppDl extends Component {
	render() {
		return (
			<div className="BsAppPlaceholder">
				<a className="BsAppAndroid" href={ToDl} download="client.apk">
					<img
						src="https://i.imgur.com/l7Q56Py.png"
						className="BsAppDl2"
						alt="Download on Android"
					/>
				</a>
				<a className="BsAppAndroid" href={ToDl} download="client.apk">
					<img
						src="https://i.imgur.com/dcjJ2s6.png"
						className="BsAppDl2"
						alt="Download on IOS"
					/>
				</a>
			</div>
		)
	}
}

export default withRouter(BsAppDl);