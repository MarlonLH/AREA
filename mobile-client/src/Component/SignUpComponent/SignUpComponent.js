import React from 'react';
import {View} from 'react-native';

import SignUpFormComponent from '../../LibComponent/UserFormComponent/SignUpFormComponent';

export default class SignUpComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                <SignUpFormComponent 
                    navigation={this.props.navigation}/>
            </View>
        )
    }
}