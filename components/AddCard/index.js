import React, { Component } from 'react';
import { View, StatusBar, Text, TextInput, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import {  addCardToDeck } from '../../actions/';
import { BlackButton, TextInputBlackBorder } from '../_common';
import { connect } from 'react-redux';
import styled from 'styled-components';

const AddCardWrapper = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-left: 10%;
  margin-right: 10%;
`;

class AddCard extends Component {
  state = {
    questionInputValue: '',
    answerInputValue: ''
  }

  handleQuestionInput = (input) => {
    this.setState({
      questionInputValue: input
    })
  }

  handleAnswerInput = (input) => {
    this.setState({
      answerInputValue: input
    })
  }

  handleSaveCard = (event) => {
    if (this.state.questionInputValue.length && this.state.answerInputValue.length) {
      this.props.addCardToDeck(this.props.navigation.state.params.deckId, {
        question: this.state.questionInputValue,
        answer: this.state.answerInputValue
      }).then(() => this.props.navigation.navigate('DeckView', { deckId: this.props.navigation.state.params.deckId }));
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <StatusBar translucent={false} backgroundColor="#b71845" barStyle="dark-content" />
        <AddCardWrapper>
          <TextInputBlackBorder
            value={this.state.questionInputValue}
            onChangeText={this.handleQuestionInput}
            placeholder="Card question" />
          <TextInputBlackBorder
            value={this.state.answerInputValue}
            onChangeText={this.handleAnswerInput}
            placeholder="Question answer" />
          <BlackButton textContent="Save card" onPress={this.handleSaveCard} />
        </AddCardWrapper>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCardToDeck: (deckId, cardInfo) => addCardToDeck(dispatch, deckId, cardInfo)
});

export default connect(null, mapDispatchToProps)(AddCard);
