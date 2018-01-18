import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import t from './../styles/forms';
import colors from '../styles/colors';
import { BtnPrimary, BtnPrimaryText } from '../styles/styles';

const CardContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  padding: 20px;
`;

const { Form } = t.form;
const stylesheet = {
  ...Form.stylesheet,
  textbox: {
    ...Form.stylesheet.textbox,
    normal: {
      ...Form.stylesheet.textbox.normal,
      height: 80
    },
    error: {
      ...Form.stylesheet.textbox.error,
      height: 80
    }
  }
};

const structObj = {};
const optionsObj = {};

for (let i = 0; i <= 5; i++) {
  const obj = {
    placeholder: 'Answer',
    placeholderTextColor: colors.placeholder,
    error: '* Insert a valid answer',
    multiline: true,
    stylesheet
  };
  if (i === 0) {
    structObj.question = t.String;
    optionsObj.question = {
      ...obj,
      label: 'Enter your question',
      placeholder: 'Your question',
      error: '* Insert a valid question'
    };
  } else if (i === 1) {
    structObj[`answer${i}`] = t.String;

    optionsObj[`answer${i}`] = {
      ...obj,
      label: 'Enter the answers',
      placeholder: 'Answer A (the correct one)'
    };
  } else {
    structObj[`answer${i}`] = i === 2 ? t.String : t.maybe(t.String);

    optionsObj[`answer${i}`] = {
      ...obj,
      placeholder: `Answer ${String.fromCharCode('A'.charCodeAt(0) + (i - 1))}`
    };
  }
}

const Card = t.struct(structObj);

const formOptions = {
  auto: 'none',
  fields: optionsObj
};

export default class NewCard extends React.Component {
  handleSubmit = () => {
    const value = this.form.getValue();
    if (value) {
      console.log(value);
    }
  };

  render() {
    return (
      <CardContainer>
        <Form
          ref={c => {
            this.form = c;
          }}
          type={Card}
          options={formOptions}
        />
        <BtnPrimary onPress={this.handleSubmit} style={{ marginBottom: 40 }}>
          <BtnPrimaryText> Submit</BtnPrimaryText>
        </BtnPrimary>
      </CardContainer>
    );
  }
}
