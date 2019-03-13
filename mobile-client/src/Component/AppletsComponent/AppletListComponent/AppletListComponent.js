import React from 'react';
import {View, TouchableOpacity, Image, Dimensions, ActivityIndicator} from 'react-native';
import {Text, Card} from 'react-native-paper';

import TopbarComponent from '../../../LibComponent/TopbarComponent/TopbarComponent';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class AppletListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areas: this.props.navigation.state.params.areas,
            data: this.props.navigation.state.params.data,
            img: this.props.navigation.state.params.img,
            list: [],
            loading: true
        }
    }

    static navigationOptions = {
        header: null,
      };

    componentDidMount() {
        for (i in this.state.areas) {
            if (this.state.areas[i].ActionId === this.state.data.ActionId)
                this.state.list.push(this.state.areas[i]);
        }
        this.setState({
            loading: false,
        })
    }

    _areaDetailsHandler(index) {
        this.props.navigation.push('AppletDetails', {data: this.state.areas[index]})
    }

    _listRenderHandler() {
        return this.state.list.map((data, index) => {
            return (
                <TouchableOpacity style={{flex: 1, width: windowWidth / 2, height: windowWidth / 2, alignItems: 'center', justifyContent: 'center'}} key={'data'+index} style={{padding: 1}} onPress={() => this._areaDetailsHandler(index)}>
                    <Card style={{flex: 1, padding: 5}}>
                        <View style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={{width: windowWidth / 2, height: windowWidth / 2,}} source={{uri: this.state.img}}/>
                        </View>
                        <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
                            <Text>{data.id}</Text>
                        </View>
                    </Card>
                </TouchableOpacity>
            )
        })
    }

    render() {
        if (!this.state.loading) {
            return (
                <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                    <ScrollView style={{flex: 1}}>
                        <TopbarComponent
                            title="My Applets"
                            bgColor="blue"
                            align="center"
                            txtColor="white"
                            nbIcon={-1}
                            navigation={this.props.navigation}
                            componentName="Home"/>
                        {this._listRenderHandler()}
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