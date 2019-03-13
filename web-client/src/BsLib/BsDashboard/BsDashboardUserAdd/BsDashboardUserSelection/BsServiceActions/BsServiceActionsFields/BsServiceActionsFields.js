import React, { Component } from 'react';
import { Divider, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { dashboardActionInfoChange } from '../../../../../../actions/dashboardTypes'

class BsServiceActionsFields extends Component {
	_inputChangeHandler = (event, number) => {
		let values = [ ...this.props.actionsInfo ];

		values[number] = event.target.value;
		this.props.dashboardActionInfoChange(values);
	}

	_parseFieds = () => {
		let infos = this.props.trigger.Info.split(';;');
		let fieldsText = infos[0].split(',');
		let argNumber = Number(infos[1]);
		let fields = [];

		if (argNumber === 0)
			return ("No data needed.");
		for (let i in fieldsText) {
			let field = fieldsText[i];
			fields.push(
				<div key={i} className="BsTriggerDiv">
					<input placeholder={field} onChange={(event) => this._inputChangeHandler(event, i)} className="BsServiceActionInput"/>
					<Tooltip title={field} className="BsTriggerInfo">i</Tooltip>
				</div>
			)
		}
		return (fields)
	}

  render() {
		return (
			<div className="BsTriggerFieldsDiv">
				<Divider className="BsDividerBlack10" />
				{this._parseFieds()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return ({
		actionsInfo: state.dashboard.actionsInfo
	})
}

export default connect(mapStateToProps, {
	dashboardActionInfoChange
})(BsServiceActionsFields)