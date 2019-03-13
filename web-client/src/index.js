import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

import HomePage from "./pages/HomePage/HomePage"
import About from "./pages/about"
import SignUp from "./pages/SignUp/SignUp"
import LogIn from "./pages/LogIn/LogIn"
import Dashboard from "./pages/Dashboard/Dashboard"
import Profile from "./pages/Profile/Profile"
import Apk from './pages/Apk/Apk'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/join" component={SignUp} />
                    <Route path="/connect" component={LogIn} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/about.json" component={About} />
                    <Route path="/client.apk" component={Apk} />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
