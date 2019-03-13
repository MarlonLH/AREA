/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeComponent from './src/Component/HomeComponent/HomeComponent';
import LogInComponent from './src/Component/LogInComponent/LogInComponent';
import SignUpComponent from './src/Component/SignUpComponent/SignUpComponent';
import AddComponent from './src/Component/AddComponent/AddComponent';
import SettingsComponent from './src/Component/SettingsComponent/SettingsComponent';
import ProfileComponent from './src/Component/ProfileComponent/ProfileComponent';
import AccountComponent from './src/Component/AccountComponent/AccountComponent';
import HelpComponent from './src/Component/HelpComponent/HelpComponent';
import AppletListComponent from './src/Component/AppletsComponent/AppletListComponent/AppletListComponent';
import AppletDetailsComponent from './src/Component/AppletsComponent/AppletListComponent/AppletDetailsComponent/AppletDetailsComponent';

const RootStack = createStackNavigator(
  {
    Home: HomeComponent,
    LogIn: LogInComponent,
    SignUp: SignUpComponent,
    Add: AddComponent,
    Settings: SettingsComponent,
    Profile: ProfileComponent,
    Account: AccountComponent,
    Help: HelpComponent,
    AppletList: AppletListComponent,
    AppletDetails: AppletDetailsComponent,
  },
  {
    initialRouteName: 'LogIn',
  }
);

const AppContainer = createAppContainer(RootStack);

type Props = {};
export default class App extends Component<Props> {


  render() {
    return (
      <AppContainer />
    )
  }
}