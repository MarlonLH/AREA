import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BsBigButton extends Component {
    constructor (props) {
        super (props)
        this.state = {}
        this.user = JSON.parse(localStorage.getItem("connectedUser"))
    }

    render() {
        return (
            <div className="bsBigButton-div">
                {
                    this.user ?
                        <Link to="/dashboard" className="bsBigButton-blue">Give it a try !</Link>
                    :
                        <Link to="/join" className="bsBigButton-blue">Give it a try !</Link>
                }
            </div>
        )
    }
}