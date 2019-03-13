import React, { Component } from 'react'

import BsHeader from './../../BsLib/BsHeader/BsHeader'
import BsLogin from './../../BsLib/BsLogIn/BsLogin'

export default class LogIn extends Component {
	render() {
		return (
			<div>
				<BsHeader />

				<BsLogin />
			</div>
		)
	}
}
