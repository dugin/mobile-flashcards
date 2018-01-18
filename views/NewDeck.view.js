import React from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import t from 'tcomb-form-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from './../styles/colors';
import { BtnPrimary, BtnPrimaryText } from '../styles/styles';

const { Form } = t.form;

const Deck = t.struct({
  title: t.String
});

const ViewContainer = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const formOptions = {
  auto: 'none',
  fields: {
    title: {
      label: ' What is the title of your new deck?',
      placeholder: 'Deck Title',
      placeholderTextColor: colors.placeholder,
      error: '* Insert a valid deck Title'
    }
  }
};

export default class NewDeck extends React.Component {
  handleSubmit = () => {
    const value = this.form.getValue();
    if (value) {
      console.log(value);
    }
  };

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
