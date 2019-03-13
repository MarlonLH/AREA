import React from 'react';
import {View} from 'react-native';
import {BottomNavigation} from 'react-native-paper';

import ProfileComponent from '../../Component/ProfileComponent/ProfileComponent';
import AccountComponent from '../../Component/AccountComponent/AccountComponent';

export default class BottomNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [],
            settings: this.props.settings,
        }
    }

    componentWillMount() {
        this.setState({
            index: 0,
            routes: [
                {key: 'profile', title: 'Profile', icon: 'account-box'},
                {key: 'account', title: 'Account', icon: 'edit', navigation: this.props.navigation}
            ],
        });
    }

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        profile: ProfileComponent,
        account: AccountComponent,
    })

    render() {
        return(
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                <BottomNavigation
                    navigationState={this.state}
                    onIndexChange={this._handleIndexChange}
                    renderScene={this._renderScene}
                    barStyle={{ backgroundColor: 'blue'}}
                />
            </View>
        )
    }
}