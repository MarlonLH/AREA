import React from 'react';
import {View, Text} from 'react-native';

import TopbarComponent from '../../LibComponent/TopbarComponent/TopbarComponent';

export default class HelpComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
    };

    render() {
        return(
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                <TopbarComponent 
                    title="How to create an Area"
                    bgColor="blue"
                    align="center"
                    txtColor="#f2f2f2"
                    nbIcon={-1}
                    navigation={this.props.navigation}
                    componentName='Add'/>
                <View style={{flex: 1}}>
                    <View style={{flex: 0.20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#202124', borderWidth: 2, borderRadius:25, borderColor: '#202124'}}>  1 </Text>
                        <Text style={{fontSize: 20, color: '#202124'}}> Select an Action and/or a Reaction.</Text>
                    </View>
                    <View style={{flex: 0.20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#202124', borderWidth: 2, borderRadius:25, borderColor: '#202124'}}>  2 </Text>
                        <Text style={{fontSize: 20, color: '#202124'}}> Select a Service.</Text>
                    </View>
                    <View style={{flex: 0.20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#202124', borderWidth: 2, borderRadius:25, borderColor: '#202124'}}>  3 </Text>
                        <Text style={{fontSize: 20, color: '#202124'}}> Fill the field(s) if necessary.</Text>
                    </View>
                    <View style={{flex: 0.20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#202124', borderWidth: 2, borderRadius:25, borderColor: '#202124'}}>  4 </Text>
                        <Text style={{fontSize: 20, color: '#202124'}}> Press "Create Action/Reaction".</Text>
                    </View>
                    <View style={{flex: 0.20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#202124', borderWidth: 2, borderRadius:25, borderColor: '#202124'}}>  5 </Text>
                        <Text style={{fontSize: 20, color: '#202124'}}> Press "Create Area".</Text>
                    </View>
                </View>
            </View>
        )
    }
}