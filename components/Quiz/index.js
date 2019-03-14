import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DeckListCard from '../DeckListCard';
import { WhiteButton, BlackButton, PlainTextButton } from '../_common';
import styled from 'styled-components';
import { connect } from 'react-redux';

const QuizWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const CurrentCardWrapper = styled.View`
  align-self: flex-start;
  margin-top: 20;
  margin-left: 20;
`;

const CardHeadingWrapper = styled.View`

`;

const CardInputWrapper = styled.View`
  margin-bottom: 50;
  width: 50%;
`;

const CardHeaderText = styled.Text`


`;

const QuizResultsHeading = styled.Text`


`;

class Quiz extends Component {
  state = {
    currentCard: 0,
    correctAnswers: 0,
    isShowingAnswer: false
  }

  handleCardAnswer = answer => {
    if (answer) {
      this.setState(oldState => ({
        currentCard: oldState.currentCard + 1,
        correctAnswers: oldState.correctAnswers + 1,
        isShowingAnswer: false
      }));
    } else {
      this.setState(oldState => ({
        currentCard: oldState.currentCard + 1,
        isShowingAnswer: false
      }));
    }
  }

  handleToggleAnswer = () => {
    this.setState(oldState => ({
      isShowingAnswer: !oldState.isShowingAnswer
    }));
  }

  handleRestartQuiz = () => {
    this.setState({
      currentCard: 0,
      correctAnswers: 0,
      isShowingAnswer: false
    });
  }

  handleRedirectToDeckView = () => {
    this.props.navigation.goBack();
  }

  handleAddDeck = () => {
    this.props.navigation.navigate('AddCard', { deckId: this.props.navigation.state.params.deckId })
  }

  renderQuiz = deck => {
    const deckQuestionIds = Object.keys(deck.questions);
    if (this.state.currentCard < deckQuestionIds.length) {
      return(
        <QuizWrapper>
          <CurrentCardWrapper>
            <Text style={{ fontSize: 15 }}>{ this.state.currentCard + 1 } / { deckQuestionIds.length }</Text>
          </CurrentCardWrapper>
          <CardHeadingWrapper>
            <Text style={{ fontSize: 32, textAlign: 'center' }}>{ !this.state.isShowingAnswer ? deck.questions[deckQuestionIds[this.state.currentCard]].question : deck.questions[deckQuestionIds[this.state.currentCard]].answer }</Text>
            <TouchableOpacity onPress={this.handleToggleAnswer}>
              <PlainTextButton>{this.state.isShowingAnswer ? 'Show question' : 'Show answer'}</PlainTextButton>
            </TouchableOpacity>
          </CardHeadingWrapper>
          <CardInputWrapper>
            <WhiteButton textContent="Correct" onPress={() => this.handleCardAnswer(true)} style={{ marginBottom: 12 }} />
            <BlackButton textContent="Incorrect" onPress={() => this.handleCardAnswer(false)} />
          </CardInputWrapper>
        </QuizWrapper>
      );
    } else {
      const quizResult = Math.round(this.state.correctAnswers / deckQuestionIds.length * 100);
      return(
        <QuizWrapper>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 40, textAlign: 'center' }}>Quiz results</Text>
            <PlainTextButton style={{ fontSize: 32 }}>{ quizResult > 50 ? 'Nice! ✅' : 'Well... 😅' }</PlainTextButton>
            <PlainTextButton style={{ fontSize: 30, fontWeight: 'bold' }}>{ quizResult }%</PlainTextButton>
          </View>
          <CardInputWrapper>
            <WhiteButton textContent="Restart quiz" onPress={() => this.handleRestartQuiz()} style={{ marginBottom: 12 }} />
            <BlackButton textContent="Back to deck view" onPress={() => this.handleRedirectToDeckView()} />
          </CardInputWrapper>
        </QuizWrapper>
      );
    }
  }

  render() {
    const deck = this.props.decks[this.props.navigation.state.params.deckId];
    return deck.questions
            ? this.renderQuiz(deck)
            : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><DeckListCard cardTitle="No cards yet!" cardSubTitle="Click here to add a card" onPress={this.handleAddDeck} /></View>
  }
}

const mapStateToProps = state => ({
  decks: state
});

export default connect(mapStateToProps)(Quiz);
