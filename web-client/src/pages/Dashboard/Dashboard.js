import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import BsDashboard from './../../BsLib/BsDashboard/BsDashboard';

class Dashboard extends Component {
	componentWillMount = () => {
		if (!localStorage.getItem('connectedUser'))
			this.props.history.push("/");
	}

	render() {
		return (
			<div>
				<BsDashboard />
			</div>
		)
    }
}

export default withRouter(Dashboard);