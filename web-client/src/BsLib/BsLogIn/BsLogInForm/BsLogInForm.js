import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    logEmailChanged,
    logPasswordChanged,
    logUser
} from '../../../actions/loginTypes';
import { Form, Icon, Input, Button } from 'antd';
import 'antd/dist/antd.css';

class BsLogInForm extends Component {
    constructor (props) {
        super (props)
        this.state = {
            buttonStatus: true
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.logUser(this.props.email, this.props.password);
            }
        })
    }

    checkChange = () => {
        const values = this.props.form.getFieldsValue();

        if (values.email !== this.props.email)
            this.props.logEmailChanged(values.email);
        else if (values.password !== this.props.password)
            this.props.logPasswordChanged(values.password);

        if (!values.email || !values.password)
            this.setState({ buttonStatus: true })
        else
            this.setState({ buttonStatus: false })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="bs-form-container" onChange={() => this.checkChange()}>
                <Form.Item validateStatus={this.state.accountStatus} help={this.state.accountHelp}>
                    {
                        getFieldDecorator('email', {})(
                            <Input
                                prefix={
                                    <Icon type="user" className="icon-input" />
                                }
                                placeholder="Email"
                                className="bs-form-input"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item validateStatus={this.state.passwordStatus} help={this.state.passwordHelp}>
                    {
                        getFieldDecorator('password', {})(
                            <Input
                                prefix={
                                    <Icon type="lock" className="icon-input" />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item className="bs-formitem-last">
                    <Button type="primary" htmlType="submit" className="bs-signin-button" disabled={this.state.buttonStatus}>
                        { this.props.loading ? 'Loading ...' : 'Log In' }
                    </Button>
                    <a className="bs-signin-forgot" href="/">Forgot password ?</a>
                </Form.Item>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.log.email,
        password: state.log.password,
        loading: state.log.loading,
        user: state.log.user,
        error: state.log.error
    }
}

export default connect(mapStateToProps, {
    logEmailChanged,
    logPasswordChanged,
    logUser
})(Form.create()(BsLogInForm));