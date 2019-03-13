import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    checkUserAuthorization
} from './../../../actions/userTypes';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';

class DropdownMenu extends Component {
    render () {
        return (
            <Menu>
                <Menu.Item key="0">
                    <p onClick={() => this.props.history.push("/dashboard") }>Dashboard</p>
                </Menu.Item>
                <Menu.Item key="1">
                    <p onClick={() => this.props.history.push("/profile") }>My profile</p>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">
                    <p onClick={() => this.props.handleDisconnect()} className="bsDropdown-disconnect">
                        Disconnect
                    </p>
                </Menu.Item>
            </Menu>
        )
    }
};

class BsHeaderDropdown extends Component {
    user = JSON.parse(localStorage.getItem("connectedUser"));

    componentWillMount = () => {
        this.props.checkUserAuthorization(localStorage.getItem("userToken"))
    }

    handleDisconnect = async () => {
        await localStorage.removeItem("connectedUser");
        await localStorage.removeItem("userToken");
        this.props.history.push('/join');
    }

    render() {
        if (this.props.error === 'Unauthorized')
            this.handleDisconnect();

        return (
            <Dropdown overlay={<DropdownMenu history={this.props.history} unsignUser={() => this.props.unsignUser()} handleDisconnect={this.handleDisconnect} />} trigger={['click']}>
                <p className="ant-dropdown-link bsDropdown-title">
                    {this.user.email} <Icon type="down" />
                </p>
            </Dropdown>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.user.error
    }
}

export default withRouter(connect(mapStateToProps, {
    checkUserAuthorization
})(BsHeaderDropdown));