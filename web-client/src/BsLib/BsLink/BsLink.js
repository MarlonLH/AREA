import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BsLink extends Component {
	render() {

		let link = "/"
		if (this.props.link)
			link = this.props.link

		return (
				<Link to={"" + link} className={this.props.className}>{this.props.text}</Link>
		)
	}
}
