import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import colors from '../styles/colors';

const PaginationText = styled.Text`
  color: ${colors.primary};
  text-align: center;
  margin-top: 15px;
  margin-bottom: -5px;
`;

const Stepper = ({ step, amount }) => (
  <View>
    <PaginationText>
      {step} of {amount}
    </PaginationText>
    <MaterialCommunityIcons
      style={{ textAlign: 'center' }}
      name="dots-horizontal"
      color="#fff"
      size={30}
    />
  </View>
);
Stepper.propTypes = {
  step: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired
};
export default Stepper;
