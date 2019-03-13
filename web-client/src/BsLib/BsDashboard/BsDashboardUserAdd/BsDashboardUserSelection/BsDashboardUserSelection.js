import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    dashboardChangeDisplay
} from '../../../../actions/dashboardTypes';
import { MdCancel, MdChevronRight } from 'react-icons/md';
import BsServiceSelect from './BsServiceSelect/BsServiceSelect';
import BsServiceActions from './BsServiceActions/BsServiceActions';
import BsServiceReactions from './BsServiceReactions/BsServiceReactions';
import BsServiceButton from './BsServiceButton/BsServiceButton';

class BsDashboardUserSelection extends Component {

    _handleClick = () => {
        this.props.dashboardChangeDisplay(0);
    }

    render() {
        return (
            <div className="BsSelectService-none-container">
                <MdCancel
                    className="BsDashboardCancel"
                    onClick={() => this._handleClick()} />
                <div className="BsSelectedService-main">
                    <div style={{ display: "inline-flex" }}>
                        <BsServiceSelect selectedService={this.props.selectedService} />
                        <MdChevronRight className="BsSelectedServiceChevron" />
                        <BsServiceActions selectedService={this.props.selectedService} />
                        <MdChevronRight className="BsSelectedServiceChevron" />
                        <BsServiceSelect selectedService={this.props.selectedReaction} />
                        <MdChevronRight className="BsSelectedServiceChevron" />
                        <BsServiceReactions selectedReaction={this.props.selectedReaction} />
                    </div>
                </div>
                <BsServiceButton />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        services: state.dashboard.services,
        selectedService: state.dashboard.selectedService,
        selectedReaction: state.dashboard.selectedReaction
    })
}

export default connect(mapStateToProps, {
    dashboardChangeDisplay
})(BsDashboardUserSelection);