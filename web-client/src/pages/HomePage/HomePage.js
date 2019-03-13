import React, { Component } from "react";

import BsHeader from "./../../BsLib/BsHeader/BsHeader";
import BsWelcome from "./../../BsLib/BsWelcome/BsWelcome";
import BsBigButton from "./../../BsLib/BsBigButton/BsBigButton";
import BsProduct from './../../BsLib/BsProduct/BsProduct';

export default class HomePage extends Component {
	render() {
		return (
			<div>
				<BsHeader />

				<BsWelcome />
				<BsBigButton />
				<BsProduct />
			</div>
		);
	}
}