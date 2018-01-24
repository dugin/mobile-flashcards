import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import colors from '../styles/colors';
import { numberToChar } from '../utils/string.helper';

const PaginationText = styled.Text`
  color: ${colors.primary};
  text-align: center;
  margin-top: 15px;
  margin-bottom: -5px;
`;

const Dot = styled.View`
  background-color: transparent;
  border-color: ${colors.primary};
  border-width: 1px;
  height: 10px;
  width: 10px;
  border-radius: 50;
  margin-left: 2px;
`;

const DotContainer = styled.View`
  margin: 10px 0 20px 0;
  flex: 1;
  justify-content: center;
  flex-direction: row;
`;
const Stepper = ({ step, amount }) => (
  <View>
    <PaginationText>
      {step} of {amount}
    </PaginationText>
    <DotContainer>
      {new Array(amount).fill(true).map((v, i) => (
        <Dot
          key={numberToChar(i)}
          style={{
            backgroundColor: i + 1 <= step ? colors.primary : 'transparent'
          }}
        />
      ))}
    </DotContainer>
  </View>
);
Stepper.propTypes = {
  step: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired
};
export default Stepper;
