import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const ListItemTitle = styled.Text`
  font-size: 22px;
  color: white;
  text-align: center;
  background-color: transparent;
`;

const ListItemSubTitle = styled.Text`
  font-size: 16px;
  color: lightgray;
  text-align: center;
  background-color: transparent;
`;

const DeckTitle = ({ title, subtitle }) => (
  <View>
    <ListItemTitle> {title} </ListItemTitle>
    <ListItemSubTitle> {subtitle} </ListItemSubTitle>
  </View>
);

DeckTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default DeckTitle;
