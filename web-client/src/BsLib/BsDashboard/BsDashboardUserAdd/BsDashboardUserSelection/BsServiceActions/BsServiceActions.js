import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	dashboardGetActions,
	dashboardSelectTrigger
} from '../../../../../actions/dashboardTypes';
import BsServiceActionsSelect from './BsServiceActionsSelect/BsServiceActionsSelect';
import BsServiceActionsFields from './BsServiceActionsFields/BsServiceActionsFields';

class BsServiceActions extends Component {componentDidUpdate = (previousState) => {
		if (this.props.selectedService !== previousState.selectedService) {
			if (this.props.selectedService) {
				this.props.dashboardSelectTrigger(null)
				this.props.dashboardGetActions(this.props.selectedService.id);
			}
		}
	}

	_updateTrigger = (trigger) => {
		this.props.dashboardSelectTrigger(trigger)
	}

	render() {
		return (
			<div className="BsTable100">
				<div className="BsTableCellMiddle">
					{this.props.selectedService === null && "Select a service"}
					{this.props.selectedService !== null && this.props.loading === true && "Loading"}
					{this.props.selectedService !== null && this.props.loading === false && <BsServiceActionsSelect actions={this.props.actions} updateTrigger={this._updateTrigger} />}
					{this.props.trigger && <BsServiceActionsFields trigger={this.props.trigger} />}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return ({
		actions: state.dashboard.actions,
		trigger: state.dashboard.trigger,
		loading: state.dashboard.actionLoading
	})
}

export default connect(mapStateToProps, {
	dashboardGetActions,
	dashboardSelectTrigger
})(BsServiceActions);