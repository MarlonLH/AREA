import React, { Component } from 'react'
import BsDashboardUserSelection from './BsDashboardUserSelection/BsDashboardUserSelection';
import BsDashboardQuery from './../BsDashboardServices/BsDashboardQuery/BsDashboardQuery';
import { Tabs } from 'antd';
import BsDashboardReactions from './BsDashboardReactions/BsDashboardReactions';

const TabPane = Tabs.TabPane;

export default class BsDashboardUserAdd extends Component {
	render() {
		return (
			<div>
				<div className="BsSelectService-main">
					<BsDashboardUserSelection />
				</div>
				<div className="BsDashboardServices-main">
					<Tabs defaultActiveKey="1" className="BsServicesTabs" size="large">
						<TabPane tab="Action Service" key="1"><BsDashboardQuery add={false} /></TabPane>
						<TabPane tab="Reaction Service" key="2"><BsDashboardReactions /></TabPane>
					</Tabs>
				</div>
			</div>
		)
	}
}
