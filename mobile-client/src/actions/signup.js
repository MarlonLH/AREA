import API from '../apis/api';
import {AsyncStorage} from 'react-native';

export function _signUpHandler(login, password, navigation) {
    const new_user = true;
    try {
        API.apiPOST('http://10.0.2.2:8080/v1/users', {
            email: login,
            password: password
        })
        .then(res => {
            AsyncStorage.setItem('new_user', JSON.stringify(new_user));
            navigation.navigate('Home');
        })
    } catch (error) {
        console.log(error.message);
    }
}