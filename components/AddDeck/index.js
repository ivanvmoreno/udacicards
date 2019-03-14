import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import {  saveDeckTitle } from '../../actions/';
import { BlackButton, TextInputBlackBorder } from '../_common';
import { connect } from 'react-redux';
import styled from 'styled-components';

const AddCardWrapper = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-left: 10%;
  margin-right: 10%;
`;

class AddDeck extends Component {
  state = {
    deckTitleInputValue: '',
  }

  handleInputValue = input => {
    this.setState({
      deckTitleInputValue: input
    });
  }

  handleAddDeck = event => {
    if (this.state.deckTitleInputValue.length) {
      this.props.saveDeckTitle(this.state.deckTitleInputValue)
        .then(res => {
          this.setState({
            deckTitleInputValue: ''
          });
          this.props.navigation.navigate('DeckView', { deckId: res });
        });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <AddCardWrapper>
          <TextInputBlackBorder
            value={this.state.deckTitleInputValue}
            onChangeText={this.handleInputValue}
            placeholder="Deck title" />
          <BlackButton textContent="Add deck" onPress={this.handleAddDeck} />
        </AddCardWrapper>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveDeckTitle: deckTitle => saveDeckTitle(dispatch, deckTitle)
});

export default connect(null, mapDispatchToProps)(AddDeck);
