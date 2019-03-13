import React, { Component } from 'react'

import BsHeader from '../../BsLib/BsHeader/BsHeader'
import BsSignUp from '../../BsLib/BsSignUp/BsSignUp'

export default class SignIn extends Component {
	render() {
		return (
			<div>
				<BsHeader />

				<BsSignUp />
			</div>
		)
	}
}
