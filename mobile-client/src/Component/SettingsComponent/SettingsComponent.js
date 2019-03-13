import React from 'react';
import {View} from 'react-native';

import TopbarComponent from '../../LibComponent/TopbarComponent/TopbarComponent';
import BottomBar from '../../LibComponent/Navbar/BottomNavbar';

export default class SettingsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                <TopbarComponent 
                    title="Settings"
                    bgColor="blue"
                    align="center"
                    txtColor="#f2f2f2"
                    nbIcon={-1}
                    navigation={this.props.navigation}
                    componentName='Home'/>
                <View style={{flex: 1,}}>
                    <BottomBar home={false} settings={true} navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
}