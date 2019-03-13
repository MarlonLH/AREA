import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	allServices
} from './../../actions/frontPageTypes'

import Automate from "../../ressources/Product1.png";
import Connection from "../../ressources/Product2.jpg";
import Bullshit from "../../ressources/Product3.png";
import BsAppDl from './BsAppDl/BsAppDl';

class BsProduct extends Component {
	componentDidMount = () => {
		this.props.allServices();
	}

	_queryServices = () => {
		if (!this.props.services)
			return;
		let services = this.props.services.map((service, index) => {
			return (
				<div
					className="BsServiceSquarePres"
					id={service.id}
					key={"" + service.Name + index}
					style={{backgroundImage: "url(" + service.ImgUrl + ")"}} >
				</div>
			)
		})
		return services;
	}

	render() {
		return (
			<div className="homepageContainer">
				<div className="productContainer">
					<div className="firstLeftProduct">
						<p className="product-p-title"><span className="product-span-title">BS-AREA</span> helps you automize your tasks by making your apps work with each other.</p>
						<p className="product-p-text">Choose from a large number of applications and services to avoid redundant stains.</p>
					</div>
					<div className="firstRightProduct">
						<img src={Automate} alt="Automate" />
					</div>
				</div>
				<div className="BsService-Placeholder">
					{this._queryServices()}
				</div>
				<div className="productContainer">	
					<div className="firstRightProduct">
						<img src={Connection} alt="Connect" className="product-image"/>
					</div>
					<div className="firstLeftProduct">
						<p className="product-p-title"><span className="product-span-title">Select</span> any thing you need, from google to a simple timer.</p>
						<p className="product-p-text">You will be able to choose among many of options.</p>
					</div>
				</div>
				<div className="productContainer">	
					<div className="firstLeftProduct">
						<p className="product-p-title">And <span className="product-span-title">connect it</span> with anything you want.</p>
						<p className="product-p-text">We can send you a mail, or remind you of something every hour.</p>
					</div>
					<div className="firstRightProduct">
						<img src={Bullshit} alt="Bullshit" className="product-image"/>
					</div>
				</div>
				<div className="productContainer backgroundColorLightgray">
					<div className="productAppDl">
						<p className="product-p-title">Download our apk on your phone.</p>
					</div>
				</div>
				<div className="productContainer backgroundColorLightgray">
					<BsAppDl />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		services: state.front.services
	}
}

export default connect(mapStateToProps, {
	allServices
})(BsProduct)