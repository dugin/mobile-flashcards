import React from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

const ViewContainer = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export default class Quiz extends React.Component {
  render() {
    return (
      <ViewContainer>
        <Form
          ref={c => {
            this.form = c;
          }}
          type={Deck}
          options={formOptions}
        />
        <BtnPrimary onPress={this.handleSubmit}>
          <BtnPrimaryText> Submit</BtnPrimaryText>
        </BtnPrimary>
      </ViewContainer>
    );
  }
}
