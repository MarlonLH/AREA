import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdChevronRight } from 'react-icons/md';
import BsServiceSelect from '../../BsDashboardUserAdd/BsDashboardUserSelection/BsServiceSelect/BsServiceSelect';
import BsUserServiceArea from './BsUserServiceArea/BsUserServiceArea';

class BsShowArea extends Component {
	render() {
		return (
            <div className="BsSelectService-none-container">
				<div className="BsSelectedService-main">
					<div style={{ display: "inline-flex" }}>
						<BsServiceSelect selectedService={this.props.userSelectedService} />
						<MdChevronRight className="BsSelectedServiceChevron" />
						<BsUserServiceArea />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userSelectedService: state.dashboard.userSelectedService
		
	}
}

export default connect(mapStateToProps)(BsShowArea)