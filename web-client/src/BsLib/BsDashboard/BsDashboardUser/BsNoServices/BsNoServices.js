import React, { Component } from 'react'

export default class BsNoServices extends Component {
  render() {
        return (
            <div className="BsSelectService-none-container">
                <div className="BsSelectService-none">
                    Select a service below to see all his subscriptions.
                    <br></br>
                    Or click on the cross in order to add one.
                </div>
            </div>
        )
    }
}
