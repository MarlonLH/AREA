import React, { Component,  } from 'react';
import { connect } from 'react-redux';
import BsLink from '../BsLink/BsLink';
import BsHeaderDropdown from './BsHeaderDropdown/BsHeaderDropdown'

class BsHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.user = JSON.parse(localStorage.getItem("connectedUser"))
        this.backgroundColor = '#ffffff';
        if (this.user && this.user.username)
            this.backgroundColor = this.user.username;
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    
    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <div className="bsHeader-container" style={{ backgroundColor: this.backgroundColor}}>
                <div className="bsHeader-main">
                    <div className="bsHeader-content-container">
                        {
                            this.state.width > 430 ?
                            <div className="bsHeader-name">
                                <BsLink className="title-header" text="BS-AREA" link="/" />
                            </div> : null
                        }
                        {
                            this.user ?
                                <div className="bsHeader-buttons">
                                    <BsHeaderDropdown />
                                </div>
                            :
                                <div className="bsHeader-buttons">
                                    <BsLink className="link1" text="Sign Up" link="/join" />
                                    <BsLink className="link2" text="Log In" link="/connect" />
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.sign.user,
    }
}

export default connect(mapStateToProps)(BsHeader)