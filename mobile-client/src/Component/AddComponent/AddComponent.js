import React from 'react';
import {View, ScrollView, TouchableOpacity, AsyncStorage, Image, Dimensions, ToastAndroid, ActivityIndicator} from 'react-native';
import {Card, Text, Button, TextInput, IconButton} from 'react-native-paper';

import TopbarComponent from '../../LibComponent/TopbarComponent/TopbarComponent';
import API from '../../apis/api';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class AddComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSettingAction: false,
            isSettingReaction: false,
            isSelectingAction: false,
            isSelectingReaction: false,
            fillingActionFields: null,
            fillingReactionFields: null,
            ServicesAction: null,
            ServicesReaction: null,
            Actions: null,
            Reactions: null,
            selectedAction: null,
            selectedReaction: null,
            fieldsNumber: null,
            fieldsName: null,
            inputActionValue: [],
            inputReactionValue: [],
            ipServeur: '',
            userToken: '',
            googleToken: '',
            loading: true,
        }
    }

    static navigationOptions = {
        header: null,
    };

    /***************************************************************************/

    componentDidMount = async () => {
        try {
            await AsyncStorage.getItem('ipServeur').then((value) => {
                this.setState({
                    ipServeur : 'http://' + JSON.parse(value) + ':8080/v1/',
                })
            })
            await AsyncStorage.getItem('token').then((value) => {
                this.setState({
                    userToken : JSON.parse(value),
                })
            })
            await AsyncStorage.getItem('googleToken').then((value) => {
                this.setState({
                    googleToken: JSON.parse(value),
                })
            })
        } catch (error) {
            console.log(error);
        }
        this._serviceDataHandler();
        this.setState({
            loading: false,
        })
    }

    _fieldNameAcParsingHandler() {
        let infos = this.state.selectedAction.Info.split(";;");
        fieldName = infos[0].split(',');
        return fieldName;
    }

    _fieldNumberAcParsingHandler() {
        let infos = this.state.selectedAction.Info.split(";;");
        fieldNumber = Number(infos[1]);
        return fieldNumber;
    }

    _fieldNameReaParsingHandler() {
        let infos = this.state.selectedReaction.Info.split(";;");
        fieldName = infos[0].split(',');
        return fieldName;
    }

    _fieldNumberReaParsingHandler() {
        let infos = this.state.selectedReaction.Info.split(";;");
        fieldNumber = Number(infos[1]);
        return fieldNumber;
    }

    _inputActionChangeHandler = (event, key, fieldNumber) => {
        val = this.state.inputActionValue;
        val[key] = event.nativeEvent.text;
        this.setState({
            inputActionValue: val,
            fieldsNumber: fieldNumber,
        })
    }

    _inputReactionChangeHandler = (event, key, fieldNumber) => {
        val = this.state.inputReactionValue;
        val[key] = event.nativeEvent.text;
        this.setState({
            inputReactionValue: val,
            fieldsNumber: fieldNumber,
        })
    }

    _createActionTrigger = async () => {
        let count = 0;
        for (i in this.state.inputActionValue) {
            count = count + 1;
        }
        if (count !== this.state.fieldsNumber)
            ToastAndroid.show("You need to fill the field(s)",ToastAndroid.SHORT, ToastAndroid.CENTER);
        else {
            this.setState({
                fillingActionFields: false,
                fillingReactionFields: false,
            })
        }
    }

    _createReactionTrigger = async () => {
        let count = 0;
        for (i in this.state.inputReactionValue) {
            count = count + 1;
        }
        if (count !== this.state.fieldsNumber)
            ToastAndroid.show("You need to fill the field(s)",ToastAndroid.SHORT, ToastAndroid.CENTER);
        else {
            this.setState({
                fillingActionFields: false,
                fillingReactionFields: false,
            })
        }
    }

    _createArea() {
        try {
            let len_action = 0;
            let len_reaction = 0;
            let count = 0;
            let str = "";
            let str2 = "";
            for (i in this.state.inputActionValue)
                len_action += 1;
            for (i in this.state.inputReactionValue)
                len_reaction +=1;
            for (i in this.state.inputActionValue) {
                if (len_action === 1 || count === 0)
                    str = this.state.inputActionValue[i];
                else
                    str = str + ";;" + this.state.inputActionValue[i];
                count += 1;
            }
            count = 0;
            for (i in this.state.inputReactionValue) {
                if (len_reaction === 1 || count === 0)
                    str2 = this.state.inputReactionValue[i];
                else
                    str2 = str2 + ";;" + this.state.inputReactionValue[i];
                count += 1;
            }
            API.areaPOST(this.state.ipServeur + 'areas', this.state.userToken,
            {
                ActionParam: str,
                ReactionParam: str2,
                Active: 1,
                ServiceSourceId: this.state.selectedAction.ServiceId,
                ActionId: this.state.selectedAction.id,
                ReactionId: this.state.selectedReaction.id,
            }).then((res) => {
                if (res.success)
                    this.props.navigation.push("Home");
            })
        } catch (error) {
            console.log(error);
            ToastAndroid.show('Select an "Action" and/or a "Reaction"', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }

    /***************************************************************************/

    _serviceDataHandler = async () => {
        await API.apiGET(this.state.ipServeur + 'services/actions', this.state.userToken).then((res) => {
            this.setState({
                ServicesAction: res,
            })
        })
        await API.apiGET(this.state.ipServeur + 'services/reactions', this.state.userToken).then((res) => {
            this.setState({
                ServicesReaction: res,
            })
        })
    }
    
    /***************************************************************************/

    _serviceActionPressedHandler = async (data) => {
        await API.apiGET(this.state.ipServeur + 'actions/all/' + data.id, this.state.userToken).then((value) => {
            this.setState({
                Actions: value,
                isSettingAction: false,
                isSelectingAction: true,
            })
        })
    }

    _serviceReactionPressedHandler = async (data) => {
        await API.apiGET(this.state.ipServeur + 'reactions/all/' + data.id, this.state.userToken).then((value) => {
            this.setState({
                Reactions: value,
                isSettingReaction: false,
                isSelectingReaction: true,
            })
        })
    }
    
    /***************************************************************************/

    _isSettingActionHandler() {
        if (this.state.isSettingAction === false)
            this.setState({
                isSettingAction: true,
            })
        else
            this.setState({
                isSettingAction: false,
            })
    }

    _isSettingReactionHandler() {
        if (this.state.isSettingReaction === false)
            this.setState({
                isSettingReaction: true,
            })
        else
            this.setState({
                isSettingReaction: false,
            })
    }
    
    /***************************************************************************/

    _actionTriggerSelectedHandler(data) {
        this.setState({
            selectedAction: data,
            isSelectingAction: false,
            fillingActionFields: true,
        })
    }

    _reactionTriggerSelectedHandler(data) {
        this.setState({
            selectedReaction: data,
            isSelectingReaction: false,
            fillingReactionFields: true,
        })
    }
        
    /***************************************************************************/
    
    /***************************************************************************/

    /***************************************************************************/

    _serviceActionRenderHandler() {
        return this.state.ServicesAction.map((data, index) => {
            if (data.Auth === true && this.state.googleToken === null) {
                return null
            } else {
                return (
                    <TouchableOpacity key={'data' + index} style={{justifyContent: 'space-around'}} onPress={() => this._serviceActionPressedHandler(data)}>
                        <View>
                            <Image style={{height: windowHeight / 2, width: windowWidth}} source={{uri:data.ImgUrl}}/>
                        </View>
                    </TouchableOpacity>
                )
            }
        })
    }

    _serviceReactionRenderHandler() {
        return this.state.ServicesReaction.map((data, index) => {
            if (data.Auth === true && this.state.googleToken === null) {
                return null
            } else {
                return (
                    <TouchableOpacity key={'data' + index} style={{justifyContent: 'space-around'}} onPress={() => this._serviceReactionPressedHandler(data)}>
                        <View>
                            <Image style={{height: windowHeight / 2, width:  windowWidth}} source={{uri:data.ImgUrl}}/>
                        </View>
                    </TouchableOpacity>
                )
            }
        })
    }
    
    /***************************************************************************/

    _actionsRenderHandler() {
        return this.state.Actions.map((data, index) => {
            return (
                <TouchableOpacity key={'data' + index} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => this._actionTriggerSelectedHandler(data)}>
                    <View>
                        <Text style={{fontSize:30}}>{data.Name}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    _reactionsRenderHandler() {
        return this.state.Reactions.map((data, index) => {
            return (
                <TouchableOpacity key={'data' + index} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => this._reactionTriggerSelectedHandler(data)}>
                    <View>
                        <Text style={{fontSize:30}}>{data.Name}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }
    
    /***************************************************************************/

    _actionFieldRenderHandler() {
        fieldsName = this._fieldNameAcParsingHandler();
        fieldsNumber = this._fieldNumberAcParsingHandler();
        if (fieldsNumber !== 0) {
            return fieldsName.map((data, index) => {
                return (
                    <View key={'data' + index} style={{paddingTop: 10, padding: 25}}>
                        <TextInput placeholder={data} mode='flat' onChange={(event) => this._inputActionChangeHandler(event, 'data' + index, fieldsNumber)}></TextInput>
                    </View>
                )
            })
        } else {
            this.setState({
                inputActionValue: [],
                isSelectingAction: false,
                fillingActionFields: false,
            })
        }
    }

    _reactionFieldRenderHandler() {
        fieldsName = this._fieldNameReaParsingHandler();
        fieldsNumber = this._fieldNumberReaParsingHandler();
        if (fieldsNumber !== 0) {
            return fieldsName.map((data, index) => {
                return (
                    <View key={'data' + index} style={{paddingTop: 10, padding: 25}}>
                        <TextInput placeholder={data} mode='flat' onChange={(event) => this._inputReactionChangeHandler(event, 'data' + index, fieldsNumber)}></TextInput>
                    </View>
                )
            })
        } else {
            this.setState({
                inputReactionValue: [],
                isSelectingAction: false,
                fillingReactionFields: false,
            })
        }
    }
    
    /***************************************************************************/

    _topBarBackHandler(step) {
        try {
            if (step === 1) {
                this.setState({
                    isSettingAction: false,
                    isSettingReaction: false,
                })
            } else if (step === 2 && this.state.isSelectingAction === true) {
                this.setState({
                    isSelectingAction: false,
                    isSettingAction: true,
                })
            } else if (step === 2 && this.state.isSelectingReaction === true) {
                this.setState({
                    isSelectingReaction: false,
                    isSettingReaction: true,
                })
            } else if (step === 3 && this.state.fillingActionFields === true) {
                this.setState({
                    selectedAction: null,
                    fillingActionFields: false,
                    isSelectingAction: true,
                })
            } else if (step === 3 && this.state.fillingReactionFields === true) {
                this.setState({
                    selectedReaction: null,
                    fillingReactionFields: false,
                    isSelectingReaction: true,
                })
            }
        } catch (error) {
            console.log(error); 
        }
    }

    render() {
        if (!this.state.loading) {
            if (this.state.isSettingAction === true)
                return (
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <View style={{
                                flex: 0.10,
                                backgroundColor: 'blue',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'}}>
                                <View style={{
                                    flex: 0.125,
                                }}>
                                    <IconButton
                                        icon='arrow-back'
                                        color='white'
                                        size={30}
                                        onPress={() => this._topBarBackHandler(1)}/>
                                </View>
                                <View style={{
                                    flex: 0.875
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        padding: 15}}>
                                        New Applet
                                    </Text>
                                </View>
                            </View>
                            {this._serviceActionRenderHandler()}
                        </ScrollView>
                    </View>
                )
            else if (this.state.isSettingReaction === true)
                return (
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <View style={{
                                flex: 0.10,
                                backgroundColor: 'blue',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'}}>
                                <View style={{
                                    flex: 0.125,
                                }}>
                                    <IconButton
                                        icon='arrow-back'
                                        color='white'
                                        size={30}
                                        onPress={() => this._topBarBackHandler(1)}/>
                                </View>
                                <View style={{
                                    flex: 0.875
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        padding: 15}}>
                                        New Applet
                                    </Text>
                                </View>
                            </View>
                            {this._serviceReactionRenderHandler()}
                        </ScrollView>
                    </View>
                )
            else if (this.state.isSelectingAction === true)
                return (
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <View style={{
                                flex: 0.10,
                                backgroundColor: 'blue',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'}}>
                                <View style={{
                                    flex: 0.125,
                                }}>
                                    <IconButton
                                        icon='arrow-back'
                                        color='white'
                                        size={30}
                                        onPress={() => this._topBarBackHandler(2)}/>
                                </View>
                                <View style={{
                                    flex: 0.875
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        padding: 15}}>
                                        New Applet
                                    </Text>
                                </View>
                            </View>
                            {this._actionsRenderHandler()}
                        </ScrollView>
                    </View>
                )
            else if (this.state.isSelectingReaction === true)
                return (
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <View style={{
                                flex: 0.10,
                                backgroundColor: 'blue',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'}}>
                                <View style={{
                                    flex: 0.125,
                                }}>
                                    <IconButton
                                        icon='arrow-back'
                                        color='white'
                                        size={30}
                                        onPress={() => this._topBarBackHandler(2)}/>
                                </View>
                                <View style={{
                                    flex: 0.875
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        padding: 15}}>
                                        New Applet
                                    </Text>
                                </View>
                            </View>
                            {this._reactionsRenderHandler()}
                        </ScrollView>
                    </View>
                )
            else if (this.state.fillingActionFields === true) {
                return (
                    <View style={{flex: 1}}>
                        <View style={{
                            flex: 0.10,
                            backgroundColor: 'blue',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row'}}>
                            <View style={{
                                flex: 0.125,
                            }}>
                                <IconButton
                                    icon='arrow-back'
                                    color='white'
                                    size={30}
                                    onPress={() => this._topBarBackHandler(3)}/>
                            </View>
                            <View style={{
                                flex: 0.875
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    padding: 15}}>
                                    New Applet
                                </Text>
                            </View>
                        </View>
                        {this._actionFieldRenderHandler()}
                        <Button color='blue'
                                mode='text'
                                onPress={() => this._createActionTrigger()}>Create Action</Button>
                    </View>
                )
            }
            else if (this.state.fillingReactionFields === true) {
                return (
                    <View style={{flex: 1}}>
                        <View style={{
                            flex: 0.10,
                            backgroundColor: 'blue',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row'}}>
                            <View style={{
                                flex: 0.125,
                            }}>
                                <IconButton
                                    icon='arrow-back'
                                    color='white'
                                    size={30}
                                    onPress={() => this._topBarBackHandler(3)}/>
                            </View>
                            <View style={{
                                flex: 0.875
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    padding: 15}}>
                                    New Applet
                                </Text>
                            </View>
                        </View>
                        {this._reactionFieldRenderHandler()}
                        <Button color='blue'
                                mode='text'
                                onPress={() => this._createReactionTrigger()}>Create Reaction</Button>
                    </View>
                )
            }
            else 
                return(
                    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                        <TopbarComponent
                            title="New Applet"
                            bgColor="blue"
                            align="center"
                            txtColor="white"
                            nbIcon={-2}
                            navigation={this.props.navigation}/>
                        <View style={{flex: 0.9, padding: 25, paddingLeft: 15, paddingRight: 15}}>
                            <Card style={{flex: 1, padding: 25}}>
                                <View style={{flex: 0.4, borderWidth: 1.5, borderStyle: 'dashed', borderRadius: 12, justifyContent: 'center'}}>
                                    <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => this._isSettingActionHandler()}>
                                        <View>
                                            <Text style={{fontSize: 40, fontWeight: 'bold'}}>ACTION</Text>
                                            {
                                                this.state.selectedAction
                                                ? <Text style={{fontWeight: 'bold', padding: 5, color: 'blue'}}>{this.state.selectedAction.Name}</Text>
                                                : null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 0.2, justifyContent: 'center'}}>
                                    <Text style={{fontSize: 40, fontWeight: 'bold', paddingLeft: 150}}>+</Text>
                                </View>
                                <View style={{flex: 0.4, borderWidth: 1.5, borderStyle: 'dashed', borderRadius: 12, justifyContent: 'center'}}>
                                    <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => this._isSettingReactionHandler()}>
                                        <View>
                                        <Text style={{fontSize: 40, fontWeight: 'bold'}}>REACTION</Text>
                                        {
                                            this.state.selectedReaction
                                            ? <Text style={{fontWeight: 'bold', padding: 5, color: 'blue'}}>{this.state.selectedReaction.Name}</Text>
                                            : null
                                        }
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        </View>
                        <View style={{flex: 0.1}}>
                            <Button color='blue'
                                mode='text'
                                onPress={() => this._createArea()}>Create Area</Button>
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
