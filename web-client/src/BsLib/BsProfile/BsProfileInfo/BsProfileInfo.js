import React, { Component } from 'react'
import BsManageAuth from './BsManageAuth/BsManageAuth';

export default class BsProfileInfo extends Component {
	render() {
		return (
			<div className="bs-signin">
				<div className="bs-signin-main">
					<div className="bs-signin-container">
						<div className="bs-signin-title">
							Profile																																																																			
						</div>
						<div className="bs-signin-subtitle">
							Manage your accounts.
						</div>
						<BsManageAuth />
					</div>
				</div>
			</div>
		)
	}
}
