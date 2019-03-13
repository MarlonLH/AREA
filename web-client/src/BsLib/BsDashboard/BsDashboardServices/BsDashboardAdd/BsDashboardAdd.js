import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardChangeDisplay } from './../../../../actions/dashboardTypes'

class BsDashboardAdd extends Component {
	handleClick = () => {
		this.props.dashboardChangeDisplay(1);
	}

	url = "https://i.imgur.com/KUwqQ4T.png";

	render() {
		return (
			<div
				className="BsServiceSquare"
				style={{backgroundImage: "url(" + this.url + ")"}}
				onClick={() => this.handleClick()}>
			</div>
		)
	}
}

export default connect(null, {
	dashboardChangeDisplay
})(BsDashboardAdd);