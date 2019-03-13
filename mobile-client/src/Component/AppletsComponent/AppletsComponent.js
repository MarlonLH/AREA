import React from 'react';
import {View, ScrollView, AsyncStorage, Dimensions, Image, TouchableOpacity, ActivityIndicator} from 'react-native';

import TopbarComponent from '../../LibComponent/TopbarComponent/TopbarComponent';
import API from '../../apis/api';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class AppletsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areas: [],
            imgAreas: [],
            ipServeur: '',
            userToken: '',
            ServiceActions: [],
            test: [],
            loading: true,
        }
    }

    componentDidMount = async () => {
        try {
          await AsyncStorage.getItem('ipServeur').then((value) => {
              this.setState({
                  ipServeur : 'http://' + JSON.parse(value) + ':8080/v1/',
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
        await this._getAllAreasHandler();
        await this._getImg();
        this.setState({
            loading: false,
        })
    }

    _getAllAreasHandler = async () => {
        await API.apiGET(this.state.ipServeur + 'areas', this.state.userToken).then((res) => {
            this.setState({
                areas: res,
            })
        })
        await API.apiGET(this.state.ipServeur + 'services/actions', this.state.userToken).then((res) => {
            this.setState({
                ServiceActions: res,
            })
        })
    }

    _getImg() {
        let tmpImg = []
        let count = 0;
        for (i in this.state.areas) {
            for (j in this.state.ServiceActions) {
                if (this.state.areas[i].ServiceSourceId === this.state.ServiceActions[j].id) {
                    let tmp = this.state.ServiceActions[j].ImgUrl
                    if (count !== 0) {
                        for (h in tmpImg) {
                            if (tmpImg[h] === tmp) {
                                tmp = '';
                            }
                            else {
                                tmpImg[i] = tmp;
                            }
                        }
                    } else {
                        tmpImg[i] = tmp;
                    }
                    count += 1;
                }
            }
        }
        let imgAreas = tmpImg.filter(Boolean)
        this.setState({
            imgAreas: imgAreas,
        })
    }

    _areaListHandler(index) {
        this.props.navigation.push('AppletList', {data: this.state.areas[index], areas: this.state.areas, img: this.state.imgAreas[index]});
    }

    _areasRenderHandler() {
        return this.state.imgAreas.map((data, index) => {
            return (
                <TouchableOpacity style={{width: windowWidth, height: windowHeight / 2}} key={'data' + index} onPress={() => this._areaListHandler(index)}>
                    <Image style={{width: windowWidth, height: windowHeight / 2,}} source={{uri: data}}/>
                </TouchableOpacity>
            )
        })
    }

    render() {
        if (!this.state.loading) {
            return(
                <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                    <ScrollView>
                        <TopbarComponent
                            title="My Applets"
                            bgColor="blue"
                            align="center"
                            txtColor="white"
                            nbIcon={2}
                            navigation={this.props.navigation}/>
                            {this._areasRenderHandler()}
                    </ScrollView>
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
