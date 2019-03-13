import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    signUsernameChanged,
    signEmailChanged,
    signPasswordChanged,
    signConfirmPasswordChanged,
    signTermsAgreeChanged,
    signUser
} from '../../../actions/signupTypes';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';

class BsSignUpForm extends Component {

    constructor (props) {
        super (props)
        this.state = {
            usernameStatus: "",
            usernameHelp: "",
            emailStatus: "",
            emailHelp: "",
            passwordStatus: "",
            passwordHelp: "",
            confirmPasswordStatus: "",
            confirmPasswordHelp: "",
            buttonStatus: true
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                this.props.signUser(this.props.email, this.props.password)
            }
        })
    }

    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    usernameChangeHandler = (values, cState) => {
        this.props.signUsernameChanged(values.username);
        if (values.username && values.username.length >= 6) {
            cState.usernameStatus = "success";
            cState.usernameHelp = "";
        } else {
            cState.usernameStatus = "error";
            cState.usernameHelp = "The username need to 6 be long";
        }
        return cState;
    }

    emailChangeHandler = (values, cState) => {
        this.props.signEmailChanged(values.email);
        if (values.email && this.validateEmail(values.email)) {
            cState.emailStatus = "success";
            cState.emailHelp = "";
        } else {
            cState.emailStatus = "error";
            cState.emailHelp = "The email adress is invalid";
        }
        return cState;
    }

    passwordChangeHandler = (values, cState) => {
        this.props.signPasswordChanged(values.password);
        if (values.password && values.password.length >= 6) {
            cState.passwordStatus = "success";
            cState.passwordHelp = "";
        } else {
            cState.passwordStatus = "error";
            cState.passwordHelp = "The password need to be 6 long";
        }
        return cState;
    }

    confirmPasswordChangeHandler = (values, cState) => {
        this.props.signConfirmPasswordChanged(values.confirmPassword);
        if (this.state.passwordStatus === "success" && values.confirmPassword && values.confirmPassword === values.password) {
            cState.confirmPasswordStatus = "success";
            cState.confirmPasswordHelp = "";
        } else {
            cState.confirmPasswordStatus = "error";
            cState.confirmPasswordHelp = "The password don't match";
        }
        return cState;
    }

    checkForm = () => {
        const values = this.props.form.getFieldsValue();
        let cState = {...this.state};

        if (values.username !== undefined && this.props.username !== values.username && values.username !== this.props.username)
            cState = this.usernameChangeHandler(values, cState);
        if (values.email !== undefined && this.props.email !== values.email && values.email !== this.props.email)
            cState = this.emailChangeHandler(values, cState);
        if (values.password !== undefined && this.props.password !== values.password && values.password !== this.props.password)
            cState = this.passwordChangeHandler(values, cState);
        if (values.confirmPassword !== undefined && this.props.confirmPassword !== values.confirmPassword && values.confirmPassword !== this.props.confirmPassword)
            cState = this.confirmPasswordChangeHandler(values, cState);

        if (this.props.terms !== values.terms)
            this.props.signTermsAgreeChanged(values.terms);
        if (cState.emailStatus === "success" &&
            cState.passwordStatus === "success" &&
            cState.usernameStatus === "success" &&
            cState.confirmPasswordStatus === "success" &&
            values.terms === true) {
            this.setState({
                ...cState,
                buttonStatus: false
            })
        } else {
            this.setState({
                ...cState,
                buttonStatus: true
            })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="bs-form-container" onChange={() => this.checkForm()} >
                <Form.Item validateStatus={this.state.usernameStatus} help={this.state.usernameHelp}>
                    {
                        getFieldDecorator('username', {})(
                            <Input
                                prefix={
                                    <Icon type="user" className="icon-input" />
                                }
                                placeholder="Username"
                                className="bs-form-input"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item validateStatus={this.state.emailStatus} help={this.state.emailHelp}>
                    {
                        getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email'}],
                        })(
                            <Input
                                prefix={
                                    <Icon type="mail" className="icon-input" />
                                }
                                placeholder="Email"
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
                <Form.Item validateStatus={this.state.confirmPasswordStatus} help={this.state.confirmPasswordHelp}>
                    {
                        getFieldDecorator('confirmPassword', {
                            rules: [{required: true, message: 'Please input the same password'}],
                        })(
                            <Input
                                prefix={
                                    <Icon type="lock" className="icon-input" />
                                }
                                type="password"
                                placeholder="Confirm password"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item className="bs-signin-checkbox">
                    {
                        getFieldDecorator('terms', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox className="test" >I agree to the <a href="/">Terms & Conditions</a></Checkbox>
                        )
                    }
                </Form.Item>
                <Form.Item className="bs-formitem-last">
                    <Button type="primary" htmlType="submit" className="bs-signin-button" disabled={this.state.buttonStatus}>
                        { this.props.loading ? 'Loading ...' : 'Sign Up' }
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.sign.username,
        email: state.sign.email,
        password: state.sign.password,
        confirmPassword: state.sign.confirmPassword,
        terms: state.sign.terms,
        loading: state.sign.loading,
        user: state.sign.user,
        error: state.sign.error
    }
}

export default connect(mapStateToProps, {
    signUsernameChanged,
    signEmailChanged,
    signPasswordChanged,
    signConfirmPasswordChanged,
    signTermsAgreeChanged,
    signUser
})(Form.create()(BsSignUpForm));