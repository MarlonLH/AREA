import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	dashboardGetReactionTriggers,
	dashboardSelectReactionTrigger
} from '../../../../../actions/dashboardTypes';
import BsServiceReactionsSelect from './BsServiceReactionsSelect/BsServiceReactionsSelect';
import BsServiceReactionsFields from './BsServiceReactionsFields/BsServiceReactionsFields';

class BsServiceReactions extends Component {componentDidUpdate = (previousState) => {
		if (this.props.selectedReaction !== previousState.selectedReaction) {
			if (this.props.selectedReaction) {
				this.props.dashboardSelectReactionTrigger(null)
				this.props.dashboardGetReactionTriggers(this.props.selectedReaction.id);
			}
		}
	}

	_updateTrigger = (reaTrigger) => {
		this.props.dashboardSelectReactionTrigger(reaTrigger)
	}

	render() {
		return (
			<div className="BsTable100">
				<div className="BsTableCellMiddle">
					{this.props.selectedReaction === null && "Select a service"}
					{this.props.selectedReaction !== null && this.props.reactionTrigLoading === true && "Loading"}
					{this.props.selectedReaction !== null && this.props.reactionTrigLoading === false && <BsServiceReactionsSelect reactionTriggers={this.props.reactionTriggers} updateTrigger={this._updateTrigger} />}
					{this.props.reaTrigger && <BsServiceReactionsFields reaTrigger={this.props.reaTrigger} />}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return ({
		reactionTriggers: state.dashboard.reactionTriggers,
		reaTrigger: state.dashboard.reaTrigger,
		reactionTrigLoading: state.dashboard.reactionTrigLoading
	})
}

export default connect(mapStateToProps, {
	dashboardGetReactionTriggers,
	dashboardSelectReactionTrigger
})(BsServiceReactions);