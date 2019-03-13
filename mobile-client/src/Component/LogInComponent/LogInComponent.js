import React from 'react';
import {View} from 'react-native';

import LogInFormComponent from '../../LibComponent/UserFormComponent/LogInFormComponent';

export default class LogInComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                <LogInFormComponent
                    navigation={this.props.navigation}/>
            </View>
        )
    }
}
