import React from 'react';
import {View, AsyncStorage, TouchableOpacity} from 'react-native';
import {
    Card,
    TextInput,
    Button,
    IconButton,
    Text
} from 'react-native-paper';

import TopbarComponent from '../TopbarComponent/TopbarComponent';
import API from '../../apis/api';
import UTILITY from '../../actions/utility';

export default class SignUpFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordVisibility: false,
            formType: this.props.formType,
            ipServeur: '',
        }
    }

    componentDidMount() {
        AsyncStorage.clear();
    }

    passwordVisibilityHandler() {
        this.setState({
            passwordVisibility: !this.state.passwordVisibility,
        });
    }

    _signUpHandler = async (login, password, ip) => {
        UTILITY._saveInAS('ipServeur', ip);
        try {
            await AsyncStorage.getItem('ipServeur').then((value) => {
                this.setState({
                    ipServeur: 'http://' + JSON.parse(value) + ':8080/v1/users',
                })
            })
        } catch (error) {
            console.log(error.message);
        }
        try {
            API.apiPOST(this.state.ipServeur, {
                email: login,
                password: password
            })
            .then(res => {
                UTILITY._saveInAS('token', res.token);
                UTILITY._saveInAS('user', res.user);
                this.props.navigation.navigate('Home');
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    _goBack() {
        this.props.navigation.navigate('LogIn');
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                <TopbarComponent
                    title="Sign Up"
                    bgColor="blue"
                    align="center"
                    txtColor="white"
                    nbIcon={0}/>
                <View style={{flex: 1, paddingTop: 125, paddingLeft: 15, paddingRight: 15}}>
                    <Card style={{flex: 1, paddingTop: 25}}>
                        <View style={{flex: 0.25, paddingLeft: 15, paddingRight: 15}}>
                            <TextInput
                                style={{flex: 1, backgroundColor:'transparent'}}
                                mode='flat'
                                placeholder='Email'
                                onChangeText={login => this.setState({loginInput: login})}>
                            </TextInput>
                        </View>
                        <View style={{flex: 0.25, flexDirection: 'row', justifyContent: 'center', paddingLeft: 15, paddingRight: 15}}>
                            <TextInput
                                style={{flex: 0.9, backgroundColor:'transparent'}}
                                mode='flat'
                                placeholder='Password'
                                secureTextEntry={!this.state.passwordVisibility}
                                onChangeText={password => this.setState({passwordInput: password})}>
                            </TextInput>
                            {
                                this.state.passwordVisibility
                                ? <IconButton style={{flex: 0.1}} icon='visibility' size={22} onPress={() => this.passwordVisibilityHandler()}></IconButton>
                                : <IconButton style={{flex: 0.1}} icon='visibility-off' size={22} onPress={() => this.passwordVisibilityHandler()}></IconButton>
                            }
                        </View>
                        <View style={{flex: 0.25, paddingLeft: 15, paddingRight: 15}}>
                            <TextInput
                                style={{flex: 1, backgroundColor:'transparent'}}
                                mode='flat'
                                placeholder='Ip'
                                onChangeText={ip => this.setState({ipInput: ip})}></TextInput>
                        </View>
                        <View style={{flex: 0.25, paddingTop: 10, padding: 25}}>
                            <TouchableOpacity style={{flex: 1, backgroundColor:'blue', alignItems:'center', justifyContent: 'center'}}
                            onPress={() => this._signUpHandler(this.state.loginInput, this.state.passwordInput, this.state.ipInput)}>
                                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            <Button
                                color='blue'
                                mode='text'
                                onPress={() => this._goBack()}>Go Back
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}