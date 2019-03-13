import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import BsProfile from '../../BsLib/BsProfile/BsProfile';

class Profile extends Component {
	componentWillMount = () => {
		if (!localStorage.getItem('connectedUser'))
			this.props.history.push("/");
	}

	render() {
		return (
			<div>
				<BsProfile />
			</div>
		)
	}
}

export default withRouter(Profile)