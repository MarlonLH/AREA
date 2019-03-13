import React, { Component } from 'react';
import { connect } from 'react-redux';
import BsNoServices from './BsNoServices/BsNoServices';
import BsDashboardQuery from '../BsDashboardServices/BsDashboardQuery/BsDashboardQuery';
import BsShowArea from './BsShowArea/BsShowArea';

class BsDashboardUser extends Component {
	render() {
		return (
			<div>
				<div className="BsSelectService-main">
					{!this.props.userSelectedService && <BsNoServices />}
					{this.props.userSelectedService && <BsShowArea />}
				</div>
				<div className="BsDashboardServices-main">
					<BsDashboardQuery add={true} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userSelectedService: state.dashboard.userSelectedService,
	}
}

export default connect(mapStateToProps)(BsDashboardUser);