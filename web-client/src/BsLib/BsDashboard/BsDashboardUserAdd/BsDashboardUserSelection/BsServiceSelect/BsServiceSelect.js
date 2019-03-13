import React, { Component } from 'react'

export default class BsServiceSelect extends Component {
	_checkProps = () => {
		if (this.props.selectedService !== null)
			return (this.props.selectedService.ImgUrl);
		return ("https://i.imgur.com/8paeVsw.png");
	}

	render() {
		return (
			<div
				className="BsSelectedService"
                style={{backgroundImage: "url(" + this._checkProps() + ")"}} >
			</div>
		)
	}
}
