import React, { Component } from 'react';
import ToDl from './../../apk/client.apk';

export default class Apk extends Component {
	componentDidMount = () => {
		document.getElementById("ToDl").click();
	}

	render() {
		return (
			<div>
				<a id="ToDl" href={ToDl} download="client.apk" hidden></a>
			</div>
		)
	}
}
