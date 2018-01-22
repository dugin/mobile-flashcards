import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import shuffle from 'lodash/shuffle';
import styled from 'styled-components/native';
import t from './../styles/forms';
import colors from '../styles/colors';
import { Btn, BtnText } from '../styles/styles';
import { numberToChar } from '../utils/string.helper';
import { addCard } from '../actions/deck.action';

const CardContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  padding: 30px 20px;
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
    error: '* At least two answers are required',
    multiline: true,
    stylesheet
  };
  if (i === 0) {
    structObj.question = t.String;
    optionsObj.question = {
      ...obj,
      label: 'Enter your question',
      placeholder: 'Your question',
      error: '* Question is required'
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
      placeholder: `Answer ${numberToChar(i - 1)} ${
        i === 2 ? '' : '(optional)'
      }`
    };
  }
}

const Card = t.struct(structObj);

const formOptions = {
  auto: 'none',
  fields: optionsObj
};

class NewCard extends React.Component {

  handleSubmit = () => {
    const value = this.form.getValue();
    if (value) {
      const { question, ...answers } = value;

      const card = {
        question,
        answers: shuffle(
          Object.values(answers)
            .filter(a => a && a.length > 0)
            .map((a, i) => ({ answer: a, isCorrect: i === 0 }))
        )
      };

      this.addCard(card);
      this.navigateBack();
    }
  };

  navigateBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  addCard(card) {
    this.props.dispatch(
      addCard(card, this.props.navigation.state.params.item.title)
    );
  }

  render() {
    return (
      <CardContainer>
        <KeyboardAvoidingView behavior="padding">
          <Form
            ref={c => {
              this.form = c;
            }}
            type={Card}
            options={formOptions}
          />
          <Btn onPress={this.handleSubmit} style={{ marginBottom: 40 }}>
            <BtnText> Submit</BtnText>
          </Btn>
        </KeyboardAvoidingView>
      </CardContainer>
    );
  }
}

export default connect()(NewCard);
