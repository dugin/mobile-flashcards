import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import DeckTitle from '../components/Deck-Title.component';
import {
  BtnPrimary,
  BtnPrimaryText,
  BtnAccentOutline,
  BtnAccentOutlineText
} from '../styles/styles';

const DeckContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

export default class Deck extends React.Component {
  onNavigate = () => {
    this.props.navigation.navigate('Card');
  };
  render() {
    const { item } = this.props.navigation.state.params;
    return (
      <DeckContainer style={{ backgroundColor: 'transparent' }}>
        <DeckTitle {...item} />

        <BtnPrimary style={{ marginTop: 40, marginBottom: 10 }}>
          <BtnPrimaryText>Start Quiz</BtnPrimaryText>
        </BtnPrimary>
        <BtnAccentOutline>
          <BtnAccentOutlineText onPress={this.onNavigate}>
            Add Card
          </BtnAccentOutlineText>
        </BtnAccentOutline>
      </DeckContainer>
    );
  }
}
