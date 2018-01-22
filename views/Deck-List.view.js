import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import DeckTitle from '../components/Deck-Title.component';
import { ROUTES } from '../routes';
import { receiveDecks } from '../actions/deck.action';
import colors from '../styles/colors';

const ListItemContainer = styled.TouchableOpacity`
  border-width: 1px;
  border-bottom-color: lightgray;
  padding: 30px 0;
  width: 100%;
`;

const NoDeckContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NoDeckText = styled.Text`
  text-align: center;
  color: ${colors.primary};
  font-size: 16px;
`;

class DeckList extends React.Component {
  componentDidMount() {
    this.props.dispatch(receiveDecks());
  }

  onNavigate = item => {
    this.props.navigation.navigate(ROUTES.DECK, { item });
  };

  renderItem = ({ item }) => (
    <ListItemContainer onPress={() => this.onNavigate(item)}>
      <DeckTitle {...item} />
    </ListItemContainer>
  );

  render() {
    const { decks } = this.props;

    if (decks.length === 0)
      return (
        <NoDeckContainer>
          <NoDeckText> No deck has been added yet</NoDeckText>
        </NoDeckContainer>
      );

    return (
      <FlatList
        data={decks}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

const mapStateToProps = state => {
  const { decks } = state.deck;

  return {
    decks: decks
      ? Object.values(decks).map(d => ({
          ...d,
          subtitle: `${d.questions.length} cards`
        }))
      : []
  };
};

export default connect(mapStateToProps)(DeckList);
