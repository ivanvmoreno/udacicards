import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { View, Text, TouchableHighlight, StatusBar, Platform } from 'react-native';
import { WhiteButton, BlackButton, PlainTextButton } from '../_common';
import DeckListCard from '../DeckListCard';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { removeDeck } from '../../actions';
import { clearLocalNotification, setLocalNotification } from '../../helpers';

const DeckViewWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1
`;

const DeckTitle = styled.Text`
  font-size: 32;
`;

const TotalCards = styled.Text`
  font-size: 16;
  color: rgb(108,108,108);
  text-align: center;
`;

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderBackButton onPress={() => { navigation.navigate('List') }} />
  });

  handleAddCard = () => {
    this.props.navigation.navigate('AddCard', { deckId: this.props.navigation.state.params.deckId });
  }

  handleQuizDeck = () => {
    this.props.navigation.navigate('Quiz', { deckId: this.props.navigation.state.params.deckId });
    clearLocalNotification()
      .then(setLocalNotification);
  }

  handleRemoveDeck = () => {
    this.props.removeDeck(this.props.navigation.state.params.deckId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.decks[nextProps.navigation.state.params.deckId]) {
      nextProps.navigation.navigate('List');
      return false;
    }
    return true;
  }

  render() {
    const { decks, navigation } = this.props;
    const deckAnswers = decks[navigation.state.params.deckId].questions ? Object.keys(decks[navigation.state.params.deckId].questions).length : 0;

    return(
      <DeckViewWrapper>
        <StatusBar translucent={false} backgroundColor="#b71845" barStyle="dark-content" />
        <DeckListCard
          cardTitle={ this.props.decks[deck].title }
          cardSubTitle={ this.props.decks[deck].questions ? `${Object.keys(this.props.decks[deck].questions).length} cards` : 'No cards' } />
        <View style={{ marginTop: 24 }}>
          <WhiteButton textContent="Add new card" onPress={ this.handleAddCard } style={{ marginBottom: 12 }} />
          <BlackButton textContent="Quiz this deck" onPress={ this.handleQuizDeck } style={{ marginBottom: 12 }} />
          <TouchableHighlight onPress={ this.handleRemoveDeck }>
            <PlainTextButton style={{ fontSize: 20, color: '#ff4500' }}>Delete deck (!)</PlainTextButton>
          </TouchableHighlight>
        </View>
      </DeckViewWrapper>
    );
  }
};

const mapStateToProps = state => ({
  decks: state
});

const mapDispatchToProps = dispatch => ({
  removeDeck: deckId => removeDeck(dispatch, deckId)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);
