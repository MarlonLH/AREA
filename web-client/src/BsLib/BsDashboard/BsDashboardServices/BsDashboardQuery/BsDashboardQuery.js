import React, { Component } from 'react'
import BsDashboardAdd from '../BsDashboardAdd/BsDashboardAdd';
import { connect } from 'react-redux';
import {
	dashboardGetService,
	dashboardSelectService,
	dashboardGetUserServices,
	dashboardSelectUserService,
	dashboardGetToken
} from './../../../../actions/dashboardTypes';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class BsDashboardQuery extends Component {
	componentDidMount = () => {
		this.props.dashboardGetService();
		this.props.dashboardGetToken(localStorage.getItem("userToken"));
		if (this.props.add === true)
			this.props.dashboardGetUserServices(window.localStorage.getItem("userToken"));
	}

	notifyError = () => {
        toast.error("You need to connect with google to access this Action.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

	_checkService = (service) => {
		if (service.Auth === true) {
			if (this.props.tokenStatus === false)
				this.notifyError();
			else
				this.props.dashboardSelectService(service);
		} else
			this.props.dashboardSelectService(service);
	}

	_queryServices = () => {
		if (!this.props.services)
			return;
		let services = this.props.services.map((service, index) => {
			return (
				<div
					className="BsServiceSquare"
					id={service.id}
					key={"" + service.Name + index}
					style={{backgroundImage: "url(" + service.ImgUrl + ")"}}
					onClick={() => this._checkService(service)} >
				</div>
			)
		})
		return services;
	}

	_queryUserServices = () => {
		if (!this.props.userServices)
			return;
		let userServices = [];
		for (let i in this.props.userServices)
			userServices[this.props.userServices[i].ServiceSourceId] = true
		let services = this.props.services.map((service, index) => {
			for (let i in userServices) {
				if (userServices[i] === true && Number(service.id) === Number(i)) {
					return (
						<div
							className="BsServiceSquare"
							id={service.id}
							key={"" + service.Name + index}
							style={{backgroundImage: "url(" + service.ImgUrl + ")"}}
							onClick={() => this.props.dashboardSelectUserService(service)} >
						</div>
					)
				}
			}
			return (null);
		})
		return services;
	}

	render() {
		return (
			<div className="BsService-Placeholder">
				{ !this.props.serviceLoading && this.props.add ? <BsDashboardAdd /> : null }
				{ !this.props.serviceLoading && !this.props.add ? this._queryServices() : null }
				{ !this.props.serviceLoading && this.props.add ? this._queryUserServices() : null }
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnVisibilityChange
					draggable
					pauseOnHover
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		serviceLoading: state.dashboard.serviceLoading,
		services: state.dashboard.services,
		userServicesLoading: state.dashboard.userServicesLoading,
		userServices: state.dashboard.userServices,
		tokenStatus: state.dashboard.tokenStatus
	}
}

export default connect(mapStateToProps, {
	dashboardGetService,
	dashboardSelectService,
	dashboardGetUserServices,
	dashboardSelectUserService,
	dashboardGetToken
})(BsDashboardQuery);