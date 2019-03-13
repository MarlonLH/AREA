import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardNewArea } from '../../../../../actions/dashboardTypes';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class BsServiceButton extends Component {
	state = {
		disabled: false
	}

	componentDidUpdate = (previousState) => {
		if (this.props.newAreaFail !== previousState.newAreaFail || this.props.newAreaSuccess !== previousState.newAreaSuccess) {
			if (this.props.newAreaFail)
				this.notifyError();
			else if (this.props.newAreaSuccess)
				this.notifySuccess();
		}
	}

	notifyError = () => {
        toast.error(this.props.newAreaFail, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

	notifySuccess = () => {
        toast.success(this.props.newAreaSuccess, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
	}

	_handleClick = () => {
		if (this.props.selectedService &&
		this.props.trigger &&
		this.props.actionsInfo &&
		this.props.selectedReaction &&
		this.props.reaTrigger &&
		this.props.reactionInfos) {
			if (this.props.actionsInfo === [] && this.props.reactionInfos === [])
				return;
			let argNumber = Number(this.props.trigger.Info.split(';;')[1]);

			if (this.props.actionsInfo.length !== argNumber)
				return;
			argNumber = Number(this.props.reaTrigger.Info.split(';;')[1]);
			if (this.props.reactionInfos.length !== argNumber)
				return;
			let actionParam = "";
			for (let i in this.props.actionsInfo) {
				if (!this.props.actionsInfo[i])
					return;
				if (Number(i) === 0)
					actionParam += this.props.actionsInfo[i];
				else
					actionParam += ";;" + this.props.actionsInfo[i];
			}
			let reactionParam = "";
			for (let i in this.props.reactionInfos) {
				if (!this.props.reactionInfos[i])
					return;
				if (Number(i) === 0)
					reactionParam += this.props.reactionInfos[i];
				else
					reactionParam += ";;" + this.props.reactionInfos[i];
			}
			
			let bearer = localStorage.getItem("userToken");

			this.props.dashboardNewArea(bearer, actionParam, reactionParam, this.props.trigger.id, this.props.reaTrigger.id, this.props.trigger.ServiceId);
		}
	}

	render() {
		return (
			<div className="BsSelectServiceButton-container">
                <button className="BsSelectServiceButton" onClick={() => this._handleClick()} disabled={this.state.disabled}>
					{ this.props.loadingNewArea ? "Loading" : "Add a new AREA" }
				</button>
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
	return ({
		selectedService: state.dashboard.selectedService,
		trigger: state.dashboard.trigger,
		actionsInfo: state.dashboard.actionsInfo,
		selectedReaction: state.dashboard.selectedReaction,
		reaTrigger: state.dashboard.reaTrigger,
		reactionInfos: state.dashboard.reactionInfos,
		loadingNewArea: state.dashboard.loadingNewArea,
		newAreaSuccess: state.dashboard.newAreaSuccess,
		newAreaFail: state.dashboard.newAreaFail
	})
}

export default connect(mapStateToProps, {
	dashboardNewArea
})(BsServiceButton)