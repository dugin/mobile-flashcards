import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import colors from './styles/colors';
import Deck from './views/Deck.view';
import DeckList from './views/Deck-List.view';
import NewDeck from './views/NewDeck.view';
import { MaterialIcons } from '@expo/vector-icons';
import NewCard from './views/NewCard.view';
import Quiz from './views/Quiz.view';

const sharedObj = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons name="library-books" color={tintColor} size={30} />
  )
};
const AppStackNavigator = StackNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: () => ({
        title: 'Decks',
        ...sharedObj
      })
    },
    Deck: {
      screen: Deck,
      navigationOptions: ({ navigation }) => ({
        ...sharedObj
      })
    },
    Card: {
      screen: NewCard,
      navigationOptions: () => ({
        title: 'New Card',
        ...sharedObj
      })
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.item.title,
        ...sharedObj
      })
    }
  },
  {
    cardStyle: {
      marginTop: Platform.OS !== 'ios' ? 54 : 64,
      backgroundColor: 'transparent'
    },
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'transparent'
      }
    }),

    navigationOptions: {
      title: null,
      headerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
      },
      headerTintColor: colors.primary
    }
  }
);

const AppTabNavigator = TabNavigator(
  {
    FirstTab: {
      screen: AppStackNavigator
    },
    SecondTab: {
      screen: NewDeck,
      tabBarLabel: 'New Deck',
      navigationOptions: () => ({
        tabBarLabel: 'New Deck',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="library-add" color={tintColor} size={30} />
        )
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.accent,
      style: {
        backgroundColor: colors.background
      }
    }
  }
);

export const ROUTES = {
  DECKLIST: 'DeckList',
  DECK: 'Deck',
  CARD: 'Card',
  QUIZ: 'Quiz'
};
export default AppTabNavigator;
