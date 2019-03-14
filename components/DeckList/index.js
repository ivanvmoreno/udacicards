import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDecks } from '../../actions';
import { SafeAreaView, ScrollView, View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import DeckListCard from '../DeckListCard';
import styled from 'styled-components';

const ScrollViewStyles = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

class DeckList extends Component {
  componentWillMount() {
    this.props.getDecks();

  }

  listOfDecks = () => {
    let decksList = [];
    for (deck in this.props.decks) {
      decksList.push(<DeckListCard
                        cardTitle={ this.props.decks[deck].title }
                        cardSubTitle={ this.props.decks[deck].questions ? `${Object.keys(this.props.decks[deck].questions).length} cards` : 'No cards' }
                        onPress={ () => this.handleViewDeck(deck) }
                        key={ deck } /> );
    }
    return decksList;
  }

  handleViewDeck = deckId => {
    this.props.navigation.navigate('DeckView', { deckId: deckId });
  }

  handleAddDeck = () => {
    this.props.navigation.navigate('AddDeck');
  }

  render() {
    return(
      <ScrollView contentContainerStyle={ScrollViewStyles}>
        { Object.keys(this.props.decks).length
            ? this.listOfDecks()
            : <DeckListCard cardTitle="No decks yet!" cardSubTitle="Click here to add a deck" onPress={this.handleAddDeck} /> }
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  decks: state
});

const mapDispatchToProps = dispatch => ({
  getDecks: () => dispatch(getDecks())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
