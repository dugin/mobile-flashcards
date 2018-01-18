import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import DeckTitle from '../components/Deck-Title.component';
import {
  Btn,
  BtnText,
  BtnAccentOutline,
  BtnAccentOutlineText
} from '../styles/styles';
import { ROUTES } from '../routes';

const DeckContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

export default class Deck extends React.Component {
  onNavigate = (route, item) => {
    this.props.navigation.navigate(route, { item });
  };
  render() {
    const { item } = this.props.navigation.state.params;
    return (
      <DeckContainer>
        <DeckTitle {...item} />

        <Btn
          onPress={() => this.onNavigate(ROUTES.QUIZ, item)}
          style={{ marginTop: 40, marginBottom: 10 }}
        >
          <BtnText>Start Quiz</BtnText>
        </Btn>
        <BtnAccentOutline onPress={() => this.onNavigate(ROUTES.CARD)}>
          <BtnAccentOutlineText>Add Card</BtnAccentOutlineText>
        </BtnAccentOutline>
      </DeckContainer>
    );
  }
}
