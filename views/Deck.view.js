import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import DeckTitle from '../components/Deck-Title.component';
import {
  Btn,
  BtnText,
  BtnAccentOutline,
  BtnAccentOutlineText
} from '../styles/styles';
import { ROUTES } from '../routes';
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/notification.helper';

const DeckContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

class Deck extends React.Component {
  onNavigate = (route, item) => {
    this.props.navigation.navigate(route, { item });
  };

  onStartQuiz = deck => {
    clearLocalNotification().then(setLocalNotification);

    this.onNavigate(ROUTES.QUIZ, deck);
  };
  render() {
    const { deck } = this.props;
    return (
      <DeckContainer>
        <DeckTitle {...deck} />
        <View style={{ marginBottom: 30 }} />
        {deck.questions.length > 0 && (
          <Btn
            onPress={() => this.onStartQuiz(deck)}
            style={{ marginBottom: 10 }}
          >
            <BtnText>Start Quiz</BtnText>
          </Btn>
        )}
        <BtnAccentOutline onPress={() => this.onNavigate(ROUTES.CARD, deck)}>
          <BtnAccentOutlineText>Create New Question</BtnAccentOutlineText>
        </BtnAccentOutline>
      </DeckContainer>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { decks } = state.deck;
  const { title } = props.navigation.state.params.item;

  return {
    deck: {
      ...decks[title],
      title,
      subtitle: `${decks[title].questions.length} cards`
    }
  };
};

export default connect(mapStateToProps)(Deck);
