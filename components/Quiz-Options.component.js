import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import colors from '../styles/colors';
import { numberToChar } from '../utils/string.helper';

const QuizOptionContainer = styled.View`
  flex: 1;
  background-color: ${colors.primary};
  border-radius: 5px;
`;

const QuizOptionItem = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;
const QuizOptionItemText = styled.Text`
  flex: 1;
  font-size: 14px;
  text-align: justify;
`;

const LetterText = styled.Text`
  font-size: 22px;
  margin-right: 10px;
  color: ${colors.text};
`;

const AnswerFeedbackText = styled.Text`
  color: ${colors.wrong};
  text-align: center;
  margin-bottom: 5px;
`;

export default class QuizOptions extends React.Component {
  state = { selected: '' };

  componentWillReceiveProps(nexProps) {
    if (nexProps.reset) this.setState({ selected: '' });
  }

  onSelect = i => {
    this.setState(
      {
        selected: numberToChar(i)
      },
      () => this.props.onSelect(i)
    );
  };

  setCorrectBackground = (selected, isCorrect, shouldShowAnswer) => {
    if (!shouldShowAnswer) {
      return selected ? colors.placeholder : colors.primary;
    } else if (isCorrect) return colors.right;

    return selected ? colors.wrong : colors.primary;
  };

  findCorrectAnswer = () => {
    const i = this.props.options.findIndex(o => o.isCorrect);

    return numberToChar(i);
  };

  render() {
    const { options, shouldShowAnswer } = this.props;
    const { selected } = this.state;

    return (
      <QuizOptionContainer>
        {options.map((o, i) => (
          <TouchableWithoutFeedback
            disabled={shouldShowAnswer}
            key={numberToChar(i)}
            onPress={() => this.onSelect(i)}
          >
            <QuizOptionItem
              style={{
                backgroundColor: this.setCorrectBackground(
                  selected === numberToChar(i),
                  o.isCorrect,
                  shouldShowAnswer
                ),
                borderTopLeftRadius: i === 0 ? 5 : 0,
                borderTopRightRadius: i === 0 ? 5 : 0,
                borderBottomLeftRadius: i === options.length - 1 ? 5 : 0,
                borderBottomRightRadius: i === options.length - 1 ? 5 : 0
              }}
            >
              <LetterText>{numberToChar(i)}.</LetterText>
              <QuizOptionItemText>{o.answer}</QuizOptionItemText>
            </QuizOptionItem>
          </TouchableWithoutFeedback>
        ))}
        {shouldShowAnswer && (
          <AnswerFeedbackText
            style={{
              color:
                this.findCorrectAnswer() === selected
                  ? colors.right
                  : colors.wrong
            }}
          >
            {this.findCorrectAnswer() === selected
              ? 'You are right, congratulations!'
              : `The correct answer is ${this.findCorrectAnswer()}`}
          </AnswerFeedbackText>
        )}
      </QuizOptionContainer>
    );
  }
}
