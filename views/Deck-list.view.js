import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import DeckTitle from '../components/Deck-Title.component';

const ListItemContainer = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
  padding: 40px 0;
  width: 100%;
`;

export default class DeckList extends React.Component {
  onNavigate = item => {
    this.props.navigation.navigate('Deck', { item });
  };

  renderItem = ({ item }) => (
    <ListItemContainer onPress={() => this.onNavigate(item)}>
      <DeckTitle {...item} />
    </ListItemContainer>
  );

  render() {
    return (
      <FlatList
        style={{ backgroundColor: 'transparent' }}
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
