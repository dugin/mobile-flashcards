import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { ROUTES } from '../routes';
import colors from '../styles/colors';
import {
  Btn,
  BtnAccentOutline,
  BtnAccentOutlineText,
  BtnText
} from '../styles/styles';

const ResultsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const TitleText = styled.Text`
  color: ${colors.text};
  font-size: 16px;
`;

const ResultText = styled.Text`
  margin: 10px 0 20px 0;
  color: ${colors.primary};
  font-size: 22px;
`;

const Result = ({ result, navigation, onRestart }) => {
  return (
    <ResultsContainer>
      <TitleText> Congratulations, you have finished the Quiz. </TitleText>
      <ResultText> Your final score is {result}%! </ResultText>
      <SimpleLineIcons name="emotsmile" color="#fff" size={70} />
      <Btn
        onPress={() => onRestart()}
        style={{ marginTop: 20, marginBottom: 10 }}
      >
        <BtnText>Restart Quiz</BtnText>
      </Btn>
      <BtnAccentOutline
        onPress={() => navigation.dispatch(NavigationActions.back())}
      >
        <BtnAccentOutlineText>Back to Deck</BtnAccentOutlineText>
      </BtnAccentOutline>
    </ResultsContainer>
  );
};

Result.propTypes = {
  result: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired
};

export default Result;
