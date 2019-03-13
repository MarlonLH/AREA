import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class BsServiceReactionsSelect extends Component {
	_parseTriggers = () => {
		if (!this.props.reactionTriggers)
			return;
		let reactionTriggers = this.props.reactionTriggers.map((action, index) => {
			return (
				<Option
					value={action.id}
					key={action.Name + index}
					onClick={() => this.props.updateTrigger(action)} >
					{action.Name}
				</Option>
			)
		})
		return (reactionTriggers)
	}

	render() {
		return (
			<Select defaultValue="Select a trigger" style={{ width: 200 }} onChange={this._handleChange}>
				{this._parseTriggers()}
			</Select>
		)
	}
}
