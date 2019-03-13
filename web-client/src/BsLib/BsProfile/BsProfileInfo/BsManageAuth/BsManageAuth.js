import React, { Component } from 'react';
import BsGoogleAuth from './BsGoogleAuth/BsGoogleAuth';

export default class BsManageAuth extends Component {
	render() {
		return (
			<div className="BsManageAuth-main">
				<BsGoogleAuth />
			</div>
		)
	}
}
