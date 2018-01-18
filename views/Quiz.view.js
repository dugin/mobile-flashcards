import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import colors from '../styles/colors';
import QuizOptions from '../components/Quiz-Options.component';
import { Btn, BtnText } from '../styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuestionText = styled.Text`
  color: ${colors.primary};
  font-size: 20px;
  text-align: center;
  margin: 10px 0;
`;

const ScrollViewContainer = styled.ScrollView`
  padding: 0 20px;
`;

const PaginationText = styled.Text`
  color: ${colors.primary};
  text-align: center;
  margin-top: 15px;
  margin-bottom: -5px;
`;

export default class Quiz extends React.Component {
  state = {
    enableSubmit: false,
    shouldShowAnswer: false
  };

  onSelect = answer => {
    this.setState({ enableSubmit: true });
  };

  handleSubmit = () => {
    this.setState(state => ({ shouldShowAnswer: !state.shouldShowAnswer }));
  };
  render() {
    const { enableSubmit, shouldShowAnswer } = this.state;
    return (
      <ScrollViewContainer
        innerRef={ref => (this.scrollView = ref)}
        onContentSizeChange={() => {
          if (enableSubmit) this.scrollView.scrollToEnd({ animated: true });
        }}
      >
        <QuestionText>
          Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac
          diam sit amet quam vehicula elementum sed sit amet dui. Cras ultricies
          ligula sed magna dictum porta?
        </QuestionText>
        <QuizOptions
          options={[
            {
              answer: `Donec sollicitudin molestie malesuada. Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.`
            },
            {
              answer: `Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
              isCorrect: true
            },
            {
              answer: `Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec sollicitudin molestie malesuada.`
            },
            {
              answer: `Donec sollicitudin molestie malesuada. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat.`
            },
            {
              answer: `Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.`
            }
          ]}
          shouldShowAnswer={shouldShowAnswer}
          onSelect={this.onSelect}
        />
        <PaginationText> 1 of 10 </PaginationText>
        <MaterialCommunityIcons
          style={{ textAlign: 'center' }}
          name="dots-horizontal"
          color="#fff"
          size={30}
        />
        <View style={{ marginBottom: !enableSubmit ? 40 : 10 }} />

        {enableSubmit && (
          <Btn accent onPress={this.handleSubmit} style={{ marginBottom: 20 }}>
            <BtnText accent> {shouldShowAnswer ? 'Next' : 'Submit'}</BtnText>
          </Btn>
        )}
      </ScrollViewContainer>
    );
  }
}
