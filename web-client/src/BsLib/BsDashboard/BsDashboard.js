import React, { Component } from 'react'
import { connect } from 'react-redux';

import BsHeader from '../BsHeader/BsHeader'
import BsDashboardUser from './BsDashboardUser/BsDashboardUser';
import BsDashboardUserAdd from './BsDashboardUserAdd/BsDashboardUserAdd';

class BsDashboard extends Component {
	render() {
		return (
			<div>
				<BsHeader />

				<div className="BsDashboard-main">
					{ this.props.index === 0 && <BsDashboardUser />}
					{ this.props.index === 1 && <BsDashboardUserAdd />}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		index: state.dashboard.index
	}
}

export default connect(mapStateToProps)(BsDashboard)
