import React from 'react';
import DeckList from '../DeckList/';
import AddDeck from '../AddDeck/';
import AddCard from '../AddCard/';
import DeckView from '../DeckView/';
import Quiz from '../Quiz/';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

const Tabs = createBottomTabNavigator({
  List: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Deck List",
      tabBarIcon: ({ focused, tintColor }) => {
        return focused
          ? <Icon name="ios-list" size={20} color={tintColor} style={{ paddingTop: 10 }} />
          : <Icon name="ios-list" size={20} color={tintColor} style={{ paddingTop: 10 }} />
      }
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "New Deck",
      tabBarIcon: ({ focused, tintColor }) => {
        return focused
          ? <Icon name="ios-add-circle-outline" size={20} color={tintColor} style={{ paddingTop: 10 }} />
          : <Icon name="ios-add-circle-outline" size={20} color={tintColor} style={{ paddingTop: 10 }} />
      }
    }
  }
},
{
  tabBarOptions: {
    activeTintColor: '#147efb',
    inactiveTintColor: '#8e8e93',
    style: {
      height: 55
    }
  }
});

const MainNavigation = createStackNavigator({
  HomeScreen: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  AddCard,
  DeckView,
  Quiz
});

export default createAppContainer(MainNavigation);
