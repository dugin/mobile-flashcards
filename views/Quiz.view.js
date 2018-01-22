import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Result from '../components/Result.component';
import Stepper from '../components/Stepper.component';
import colors from '../styles/colors';
import QuizOptions from '../components/Quiz-Options.component';
import {
  Btn,
  BtnAccentOutline,
  BtnAccentOutlineText,
  BtnText
} from '../styles/styles';

const QuestionText = styled.Text`
  color: ${colors.primary};
  font-size: 20px;
  text-align: center;
  margin: 10px 0 20px 0;
`;
const SeeAnswerBtn = styled.TouchableOpacity`
  margin-bottom: 20px;
`;

const SeeAnswerBtnText = styled.Text`
  color: ${colors.accent};
  text-align: center;
`;

const ScrollViewContainer = styled.ScrollView`
  padding: 20px;
`;
class Quiz extends React.Component {
  state = {
    enableSubmit: false,
    shouldShowAnswer: false,
    step: 0,
    reset: false,
    rightAnswerAmount: {}
  };

  onSelect = answer => {
    const { cards } = this.props;

    this.setState(state => ({
      enableSubmit: true,
      reset: false,
      rightAnswerAmount: {
        [state.step]: cards[state.step].answers[answer].isCorrect
      }
    }));
  };

  onRestartQuiz = () => {
    this.setState({
      enableSubmit: false,
      shouldShowAnswer: false,
      step: 0,
      reset: false,
      rightAnswerAmount: 0
    });
  };

  handleSubmit = () => {
    this.setState(state => ({
      shouldShowAnswer: !state.shouldShowAnswer,
      reset: false
    }));
  };

  handleNext = () => {
    this.setState(state => ({
      step: state.step + 1,
      enableSubmit: false,
      shouldShowAnswer: false,
      reset: true
    }));
  };

  render() {
    const {
      enableSubmit,
      shouldShowAnswer,
      step,
      reset,
      rightAnswerAmount
    } = this.state;
    const { cards, navigation } = this.props;

    if (step === cards.length)
      return (
        <Result
          navigation={navigation}
          onRestart={this.onRestartQuiz}
          result={Math.round(
            Object.values(rightAnswerAmount).reduce(
              (acc, r) => (r ? 1 : 0) + acc
            ) /
              cards.length *
              100
          )}
        />
      );

    return (
      <ScrollViewContainer
        innerRef={ref => (this.scrollView = ref)}
        onContentSizeChange={() => {
          if (enableSubmit) this.scrollView.scrollToEnd({ animated: true });
        }}
      >
        <QuestionText>{cards[step].question}</QuestionText>
        <SeeAnswerBtn>
          <SeeAnswerBtnText
            onPress={() =>
              this.setState({
                shouldShowAnswer: true,
                enableSubmit: true,
                reset: true,
                rightAnswerAmount: {
                  [step]: false
                }
              })
            }
          >
            Show the answer
          </SeeAnswerBtnText>
        </SeeAnswerBtn>
        <QuizOptions
          options={cards[step].answers}
          shouldShowAnswer={shouldShowAnswer}
          onSelect={this.onSelect}
          reset={reset}
        />
        <Stepper step={step + 1} amount={cards.length} />
        <View style={{ marginBottom: !enableSubmit ? 40 : 10 }} />

        {enableSubmit &&
          (!shouldShowAnswer ? (
            <Btn
              accent
              onPress={this.handleSubmit}
              style={{ marginBottom: 20 }}
            >
              <BtnText accent> Submit</BtnText>
            </Btn>
          ) : (
            <BtnAccentOutline
              accent
              onPress={this.handleNext}
              style={{ marginBottom: 20 }}
            >
              <BtnAccentOutlineText>Next</BtnAccentOutlineText>
            </BtnAccentOutline>
          ))}
      </ScrollViewContainer>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { decks } = state.deck;
  const { title } = props.navigation.state.params.item;

  return {
    cards: decks[title].questions
  };
};

export default connect(mapStateToProps)(Quiz);
