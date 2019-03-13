import React from 'react';
import {View, AsyncStorage, ActivityIndicator} from 'react-native';

import AppletsComponent from '../AppletsComponent/AppletsComponent';

import API from '../../apis/api';
import UTILITY from '../../actions/utility';

export default class HomeComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        ipServeur: '',
        userToken: '',
        res: '',
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
                ipServeur : 'http://' + JSON.parse(value) + ':8080/v1/tokens',
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
        this._databaseHandler(this.state.ipServeur, this.state.userToken);
        this.setState({
          loading: false,
        })
    }

    _databaseHandler(ip, token) {
      API.apiGET(ip, token).then((res) => {
        if (res.message !== 'Parcel Pending API' || res.message !== null) {
          UTILITY._saveInAS('googleToken', res.Token);
          UTILITY._saveInAS('googleRefresh', res.Refresh);
        }
      })
    }

    render() {
        if (!this.state.loading) {
          return (
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
              <AppletsComponent navigation={this.props.navigation}/>
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