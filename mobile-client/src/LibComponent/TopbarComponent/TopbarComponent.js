import React from 'react';
import {View} from 'react-native';
import {Text, IconButton} from 'react-native-paper';

export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            bgColor: this.props.bgColor,
            align: this.props.align,
            txtColor: this.props.txtColor,
            nbIcon: this.props.nbIcon,
            componentName: this.props.componentName,
        }
    }

    render() {
        if (this.state.nbIcon === -2) {
            return (
                <View style={{
                    flex: 0.10,
                    backgroundColor: this.state.bgColor,
                    alignItems: this.state.align,
                    justifyContent: 'center',
                    flexDirection: 'row'}}>
                    <View style={{
                        flex: 0.125,
                    }}>
                        <IconButton
                            icon='arrow-back'
                            color='white'
                            size={30}
                            onPress={() => this.props.navigation.push('Home')}/>
                    </View>
                    <View style={{
                        flex: 0.875
                    }}>
                        <Text style={{
                            color: this.state.txtColor,
                            fontSize: 18,
                            fontWeight: 'bold',
                            padding: 15}}>
                            {this.state.title}
                        </Text>
                    </View>
                    <View style={{
                        flex: 0.125,
                    }}>
                        <IconButton
                            icon='info'
                            color='white'
                            size={30}
                            onPress={() => this.props.navigation.push('Help')}/>
                    </View>
                </View>
            )
        } else if (this.state.nbIcon === -1) {
            return (
                <View style={{
                    flex: 0.10,
                    backgroundColor: this.state.bgColor,
                    alignItems: this.state.align,
                    justifyContent: this.state.align,
                    flexDirection: 'row'}}>
                    <View style={{
                        flex: 0.125,
                    }}>
                        <IconButton
                            icon='arrow-back'
                            color='white'
                            size={30}
                            onPress={() => this.props.navigation.push(this.state.componentName)}/>
                    </View>
                    <View style={{
                        flex: 0.875
                    }}>
                        <Text style={{
                            color: this.state.txtColor,
                            fontSize: 18,
                            fontWeight: 'bold',
                            padding: 15}}>
                            {this.state.title}
                        </Text>
                    </View>
                </View>
            )
        } else if (this.state.nbIcon === 1) {
            return (
                <View style={{
                    flex: 0.10,
                    backgroundColor: this.state.bgColor,
                    alignItems: this.state.align,
                    justifyContent: this.state.align,
                    flexDirection: 'row'}}>
                    <View style={{
                        flex: 0.125,
                    }}>
                        <IconButton
                            icon='arrow-back'
                            color='white'
                            size={30}
                            onPress={() => this.props.navigation.navigate(this.state.componentName)}/>
                    </View>
                    <View style={{
                        flex: 0.875
                    }}>
                        <Text style={{
                            color: this.state.txtColor,
                            fontSize: 18,
                            fontWeight: 'bold',
                            padding: 15}}>
                            {this.state.title}
                        </Text>
                    </View>
                </View>
            )
        }  else if (this.state.nbIcon === 2) {
            return (
                <View style={{
                    flex: 0.10,
                    backgroundColor: this.state.bgColor,
                    alignItems: this.state.align,
                    justifyContent: 'center',
                    flexDirection: 'row'}}>
                    <View style={{
                        flex: .75
                    }}>
                        <Text style={{
                            color: this.state.txtColor,
                            fontSize: 18,
                            fontWeight: 'bold',
                            padding: 15}}>
                            {this.state.title}
                        </Text>
                    </View>
                    <View style={{
                        flex: 0.25,
                        flexDirection: 'row'
                    }}>
                        <IconButton
                            icon='add'
                            color='white'
                            size={30}
                            onPress={() => this.props.navigation.push('Add', this.props.navigation)}/>
                        <IconButton
                            icon='settings'
                            color='white'
                            size={30}
                            onPress={() => this.props.navigation.push('Settings')}/>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{
                    flex: 0.10,
                    backgroundColor: this.state.bgColor,
                    alignItems: this.state.align,
                    justifyContent: 'center',}}>
                    <Text style={{
                        color: this.state.txtColor,
                        fontSize: 18,
                        fontWeight: 'bold',
                        padding: 5}}>
                        {this.state.title}
                    </Text>
                </View>
            )
        }
    }
}