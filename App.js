import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import styled from 'styled-components/native';
import AppTabNavigator from './routes';
import './styles/forms';
import rootReducer from './root.reducer';
import { setLocalNotification } from './utils/notification.helper';

const imgBg = require('./assets/images/image-bg.jpg');

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const middlewares = [reduxThunk, promise(), createLogger()];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <BackgroundImage source={imgBg}>
          <AppTabNavigator />
        </BackgroundImage>
      </Provider>
    );
  }
}
