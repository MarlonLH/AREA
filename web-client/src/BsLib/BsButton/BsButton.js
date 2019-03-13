import React, { Component } from 'react'

export default class BsButton extends Component {
    constructor (props) {
        super (props);
        
        this.style = "bsButton";

        if (!this.props.size || this.props.size === 1)
            this.style += " bsButton-1";
        else if (this.props.size === 2)
            this.style += " bsButton-2";
        
        if (this.props.borderColor === "blue")
            this.style += " bsButton-borderblue";
        
        if (this.props.backgroundColor === "blue")
            this.style += " bsButton-bgblue";
        
        this.handlerButton = this.handlerButton.bind(this);
    }

    handlerButton = () => {
        if (this.props.clickCall !== undefined)
            this.props.clickCall();
    }

    render() {
        return (
            <button className={this.style} onClick={() => this.handlerButton()}>
                {this.props.text}
            </button>
        )
    }
}
