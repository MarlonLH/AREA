import React from 'react';
import {View, Picker, AsyncStorage, Image, Dimensions, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-paper';
import {authorize} from 'react-native-app-auth';

import API from '../../apis/api';
import UTILITY from '../../actions/utility';

const dim = Dimensions.get('window')

const config = {
    issuer: 'https://accounts.google.com/',
    clientId: '155473281338-6tbdnhmro4gso9ofl13vilhmuqenu5mo.apps.googleusercontent.com',
    redirectUrl: 'com.area:/callback',
    serviceConfiguration: {
		authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
		tokenEndpoint: 'https://oauth2.googleapis.com/token',
	},
    scopes: [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/youtube',
        'https://mail.google.com/',],
};

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: '',
            ipServeur: '',
            userToken: '',
            googleToken: '',
            googleRefresh: '',
            loading: true,
        };
    }

    componentDidMount = async () => {
        try {
            await AsyncStorage.getItem('ipServeur').then((value) => {
                this.setState({
                    ipServeur: 'http://' + JSON.parse(value) + ':8080/v1/tokens',
                })
            })
            await AsyncStorage.getItem('token').then((value) => {
                this.setState({
                    userToken : JSON.parse(value),
                })
            })
            await AsyncStorage.getItem('googleToken').then((value) => {
                this.setState({
                    googleToken : JSON.parse(value),
                })
            })
            await AsyncStorage.getItem('googleRefresh').then((value) => {
                this.setState({
                    googleRefresh : JSON.parse(value),
                })
            })
        } catch (error) {
            console.log(error.message);
        }
        this.setState({
            loading: false,
        })
    }

    _googleLogInHandler = async () => {
        if (this.state.googleToken === null) {
            try {
                    const authState = await authorize(config)
                    this.setState({
                        googleToken: authState.accessToken,
                        googleRefresh: authState.refreshToken,
                    });
            } catch (error) {
                console.log(error.message);
            }
            API.tokenPOST(this.state.ipServeur, this.state.userToken,
            {
                Token: this.state.googleToken,
                Refresh: this.state.googleRefresh,
                Active: 1,
            })
            .then(res => {
                if (res.success === false)
                    console.log("error: ", res.error);
            })
        }
    }

    _linkingHandler (val) {
        if (val != 'google') {
            this.setState({
                selectedItem: val,
            });
        } else {
            this.setState({
                selectedItem: val,
            })
            this._googleLogInHandler()
        }
    }

    render() {
        if (!this.state.loading) {
            return(
                <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                    {
                        this.state.googleToken !== null || this.state.googleToken === ''
                        ?
                        <View style={{padding: 10, flex: 0.5, alignItems: 'center'}}>
                            <Image style={{width: dim.width / 2 + dim.width / 3, height: dim.height / 2}} source={{uri: 'https://i.imgur.com/4ee7XM7.png'}}/>
                            <Text>Google Account linked</Text>
                        </View>
                        :
                        <View style={{
                            flex: 0.20,
                            padding: 45,
                        }}>
                            <Text style={{fontWeight: 'bold', fontSize: 16, padding: 10}}>Select a profile from your services</Text>
                            <Picker
                                mode="dropdown"
                                selectedValue={this.state.selectedItem}
                                onValueChange={(val) => this._linkingHandler(val)}>
                                <Picker.Item label='Choose' value='0' />
                                <Picker.Item label="Google" value="google"/>
                            </Picker>
                        </View>
                    }
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