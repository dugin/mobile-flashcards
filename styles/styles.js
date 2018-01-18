import styled from 'styled-components/native';
import colors from './colors';

export const BtnPrimary = styled.TouchableOpacity`
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.primary};
  margin-top: 10px;
`;
export const BtnPrimaryText = styled.Text`
  background-color: white;
  padding: 10px 0;
  text-align: center;
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
