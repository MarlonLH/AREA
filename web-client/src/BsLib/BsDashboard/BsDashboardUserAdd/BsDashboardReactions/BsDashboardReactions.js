import React, { Component } from 'react'
import { connect } from 'react-redux';
import { dashboardSelectReaction,
	dashboardGetReactions,
	dashboardGetToken
} from './../../../../actions/dashboardTypes';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class BsDashboardReactions extends Component {
	componentDidMount = () => {
		this.props.dashboardGetReactions();
		this.props.dashboardGetToken(localStorage.getItem("userToken"));
	}

	notifyError = () => {
        toast.error("You need to connect with google to access this Reaction.", {
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
				this.props.dashboardSelectReaction(service);
		} else
			this.props.dashboardSelectReaction(service);
	}

	_queryServices = () => {
		if (!this.props.reactions)
			return;
		let services = this.props.reactions.map((service, index) => {
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

	render() {
		return (
			<div className="BsService-Placeholder">
				{ !this.props.serviceLoading ? this._queryServices() : null }
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
		reactions: state.dashboard.reactions,
		tokenStatus: state.dashboard.tokenStatus
	}
}

export default connect(mapStateToProps, {
	dashboardSelectReaction,
	dashboardGetReactions,
	dashboardGetToken
})(BsDashboardReactions);