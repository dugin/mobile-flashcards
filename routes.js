import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
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

export const ROUTES = {
  DECKLIST: 'DeckList',
  DECK: 'Deck',
  CARD: 'Card',
  QUIZ: 'Quiz'
};

const AppStackNavigator = StackNavigator(
  {
    DeckList: {
      screen: DeckList,
      key: ROUTES.DECKLIST,
      navigationOptions: () => ({
        title: 'Decks',
        ...sharedObj
      })
    },
    Deck: {
      screen: Deck,
      key: ROUTES.DECK,
      navigationOptions: ({ navigation }) => ({
        ...sharedObj
      })
    },
    Card: {
      screen: NewCard,
      key: ROUTES.CARD,
      navigationOptions: () => ({
        title: 'New Card',
        ...sharedObj
      })
    },
    Quiz: {
      screen: Quiz,
      key: ROUTES.QUIZ,
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
        marginTop: Platform.OS !== 'ios' ? -45 : 0,
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
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom'
  }
);

export default AppTabNavigator;
