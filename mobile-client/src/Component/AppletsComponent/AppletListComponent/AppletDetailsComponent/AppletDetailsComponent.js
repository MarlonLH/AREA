import React from 'react'
import {View, AsyncStorage, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-paper';

import TopbarComponent from '../../../../LibComponent/TopbarComponent/TopbarComponent';
import API from '../../../../apis/api';

const windowWidth = Dimensions.get('window').width;

export default class AppletDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ipServeur: '',
            userToken: '',
            areaId: this.props.navigation.state.params.data.id,
            loading: true,
        }
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount = async () => {
        try {
          await AsyncStorage.getItem('ipServeur').then((value) => {
              this.setState({
                  ipServeur : 'http://' + JSON.parse(value) + ':8080/v1/areas/' + this.state.areaId,
              })
          })
          await AsyncStorage.getItem('token').then((value) => {
              this.setState({
                  userToken: JSON.parse(value),
              })
          })
        } catch (error) {
            console.log(error.message);
        }
        this.setState({
            loading: false,
        })
      }

    _deleteAreaHandler() {
        API.apiDELETE(this.state.ipServeur, this.state.userToken).then((res) => {
            if (res.success !== false)
                this.props.navigation.push('Home');
        })
    }

    render() {
        if (!this.state.loading) {
            return (
                <View style={{flex: 1, backgroundColor: "#f2f2f2"}}>
                    <TopbarComponent
                        title="My Applets"
                        bgColor="blue"
                        align="center"
                        txtColor="white"
                        nbIcon={1}
                        navigation={this.props.navigation}
                        componentName="AppletList"/>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity 
                            mode="contained" 
                            style={{width: windowWidth / 2, height: windowWidth / 3, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center'}} 
                            onPress={() => this._deleteAreaHandler()}>
                            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Delete</Text>
                        </TouchableOpacity>
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