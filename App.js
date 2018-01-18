import React from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import AppTabNavigator from './routes';
import './styles/forms';

const imgBg = require('./assets/images/image-bg.jpg');

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export default class App extends React.Component {
  render() {
    return (
      <BackgroundImage source={imgBg}>
        <AppTabNavigator />
      </BackgroundImage>
    );
  }
}
