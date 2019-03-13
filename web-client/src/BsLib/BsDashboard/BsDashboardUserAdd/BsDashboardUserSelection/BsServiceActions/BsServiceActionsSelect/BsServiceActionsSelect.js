import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class BsServiceActionsSelect extends Component {
	_handleChange = (value) => {
	}

	_parseTriggers = () => {
		if (!this.props.actions)
			return;
		let actions = this.props.actions.map((action, index) => {
			return (
				<Option
					value={action.id}
					key={action.Name + index}
					onClick={() => this.props.updateTrigger(action)} >
					{action.Name}
				</Option>
			)
		})
		return (actions)
	}

	render() {
		return (
			<Select defaultValue="Select a trigger" style={{ width: 200 }} onChange={this._handleChange}>
				{this._parseTriggers()}
			</Select>
		)
	}
}
