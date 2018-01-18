import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import DeckTitle from '../components/Deck-Title.component';
import { ROUTES } from '../routes';

const ListItemContainer = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
  padding: 40px 0;
  width: 100%;
`;

export default class DeckList extends React.Component {
  onNavigate = item => {
    this.props.navigation.navigate(ROUTES.DECK, { item });
  };

  renderItem = ({ item }) => (
    <ListItemContainer onPress={() => this.onNavigate(item)}>
      <DeckTitle {...item} />
    </ListItemContainer>
  );

  render() {
    return (
      <FlatList
        data={[
          { title: 'UdaciCards', subtitle: '3 cards' },
          { title: 'New Deck', subtitle: '1 cards' },
          { title: 'New Deck 2', subtitle: '5 cards' }
        ]}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index}
      />
    );
  }
}
