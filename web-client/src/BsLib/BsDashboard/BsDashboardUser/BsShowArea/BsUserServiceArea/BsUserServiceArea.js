import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	dashboardDeleteArea,
	dashboardGetUserServices
} from './../../../../../actions/dashboardTypes';
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


class BsUserServiceArea extends Component {

	state = {
		areas: null
	}

	componentDidMount = () => {
		this._showServiceAreas();
	}

	componentDidUpdate = (previousState) => {
		console.log(this.props);
		if (previousState.userSelectedService !== this.props.userSelectedService)
			this._showServiceAreas();
		if (previousState.deleteAreaRes !== this.props.deleteAreaRes) {
			if (this.props.deleteAreaRes === 0)
				this.notifyError();
			else if (this.props.deleteAreaRes === 1)
				this.notifySuccess();
		}
	}

	_showServiceAreas = () => {
		let areas = this.props.userServices.map((area, index) => {
			if (area.ServiceSourceId === this.props.userSelectedService.id) {
				return (
					<div key={area.id + "area" + index} className="BsAreaDiv">
						<span>{area.ActionParam} > {area.ReactionParam}</span>
						<MdDelete className="BsAreaDelete" onClick={() => {
							this.props.dashboardDeleteArea(area.id, localStorage.getItem("userToken"))
							}} />
					</div>
				)
			}
			else
				return (null);
		})
		return areas;
	}

	notifyError = () => {
        toast.error("An error occured.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

	notifySuccess = () => {
        toast.success("Area deleted.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
		});
		this.props.dashboardGetUserServices(localStorage.getItem("userToken"))
	}

	render() {
		return (
			<div className="BsUserServiceArea">
				{ this.props.actionLoading || this.props.reactionLoading ? <p>Loading</p> : this._showServiceAreas() }
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
		userServices: state.dashboard.userServices,
		userSelectedService: state.dashboard.userSelectedService,
		deleteAreaRes: state.dashboard.deleteAreaRes,
	}
}

export default connect(mapStateToProps, {
	dashboardDeleteArea,
	dashboardGetUserServices
})(BsUserServiceArea)