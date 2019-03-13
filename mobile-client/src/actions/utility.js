import {Alert, AsyncStorage} from 'react-native';

const UTILITY = {
    _showAlert: function(navigation) {
        Alert.alert(
            'Help',
            'Please select and article',
            [
                {text: 'CANCEL', onPress: () => console.log('cancel'), style: 'cancel'},
                {text: 'How often do Applets run?', onPress: () => navigation.navigate('Help', {type: 2,})},
                {text: 'Enabling and disabling Applet run notifications', onPress: () => navigation.navigate('Help', {type: 1,})},                
            ],
            {cancelable: false},
        )
    },

    _saveInAS: function(key, item) {
        try {
            AsyncStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.log(error.message);
        }
    },
}

export default UTILITY;