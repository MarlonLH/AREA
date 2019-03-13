import React from 'react';
import {View, AsyncStorage, ActivityIndicator} from 'react-native';
import {Button,} from 'react-native-paper';

import API from '../../apis/api';

export default class AccountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordVisibility: false,
            ipServeur: '',
            userToken: '',
            userData: '',
            usernameInput: '',
            emailInput: '',
            passwordInput: '',
            loading: true,
        }
    }

    componentDidMount = async () =>  {
        try {
            await AsyncStorage.getItem('user').then((value) => {
                this.setState({
                    userData: JSON.parse(value),
                })
            })
            await AsyncStorage.getItem('ipServeur').then((value) => {
                this.setState({
                    ipServeur : 'http://' + JSON.parse(value) + ':8080/v1/users',
                })
            })
            await AsyncStorage.getItem('token').then((value) => {
                this.setState({
                    userToken : JSON.parse(value),
                })
            })
        } catch (error) {
            console.log(error.message);
        }
        this.setState({
            loading: false,
        })
    }

    _signOutHandler() {
        AsyncStorage.clear();
        this.props.route.navigation.navigate('LogIn');
    }

    passwordVisibilityHandler() {
        this.setState({
            passwordVisibility: !this.state.passwordVisibility,
        });
    }

    render() {
        if (!this.state.loading) {
            return (
                <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                    <View style={{flex: 1, paddingTop: 125, paddingLeft: 15, paddingRight: 15}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <View>
                                <Button
                                    style={{backgroundColor:'blue', alignItems:'center', justifyContent: 'center'}}
                                    color='#f2f2f2'
                                    onPress={() => this._signOutHandler()}>Sign out
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }
}