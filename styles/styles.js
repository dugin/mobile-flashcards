import styled from 'styled-components/native';
import colors from './colors';
import { findColor } from '../utils/styles.helper';

export const Btn = styled.TouchableOpacity`
  border-radius: 5px;
  border-width: 1px;
  border-color: ${props => findColor(props, colors)};
  margin-top: 10px;
`;
export const BtnText = styled.Text`
  background-color: ${props => findColor(props, colors)};
  padding: 10px 0;
  text-align: center;
  color: ${props => (props.accent ? colors.primary : '#000')};
`;

export const BtnAccentOutline = styled.TouchableOpacity`
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.accent};
  margin-top: 10px;
`;
export const BtnAccentOutlineText = styled.Text`
  background-color: transparent;
  padding: 10px 0;
  text-align: center;
  color: ${colors.accent};
`;
