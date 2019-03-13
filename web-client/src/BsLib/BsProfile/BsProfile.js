import React, { Component } from 'react'
import BsHeader from '../BsHeader/BsHeader';
import BsProfileInfo from './BsProfileInfo/BsProfileInfo';

export default class BsProfile extends Component {
	render() {
		return (
			<div>
				<BsHeader />

				<BsProfileInfo />
			</div>
		)
	}
}
