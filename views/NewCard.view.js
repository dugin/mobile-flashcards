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
    error: '* Answer is required',
    multiline: true,
    stylesheet
  };
  if (i === 0) {
    structObj.version = t.maybe(
      t.enums({
        1: 'Version 1.0',
        2: 'Version 2.0'
      })
    );
    structObj.question = t.String;

    optionsObj.version = {
      label: 'Quiz Version',
      itemStyle: {
        color: colors.primary
      },
      nullOption: { value: '1', text: 'Version 1.0' },
      options: [{ value: '2', text: 'Version 2.0' }]
    };
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

const { answer2, answer3, answer4, answer5, ...rest } = structObj;

const CardVersion1 = t.struct(rest);
const CardVersion2 = t.struct(structObj);

let Card = CardVersion1;

const formOptions = {
  auto: 'none',
  fields: optionsObj
};

class NewCard extends React.Component {
  state = { version: 1 };

  onChangeForm = val => {
    const { version } = this.state;
    if (val.version) {
      if (val.version === '2' && version === 1) {
        Card = CardVersion2;
        formOptions.fields.version.nullOption = {
          value: '2',
          text: 'Version 2.0'
        };
        formOptions.fields.version.options = [
          { value: '1', text: 'Version 1.0' }
        ];
        this.setState({ version: 2, value: null });
        this.forceUpdate();
      } else if (val.version === '1' && version === 2) {
        this.reset();
        this.forceUpdate();
      }
    }
  };

  handleSubmit = () => {
    const value = this.form.getValue();
    if (value) {
      const { question, ...answers } = value;

      const card = {
        question,
        version: this.state.version,
        answers: shuffle(
          Object.values(answers)
            .filter(a => a && a.length > 0)
            .map((a, i) => ({ answer: a, isCorrect: i === 0 }))
        )
      };

      this.addCard(card);
      this.reset();
      this.navigateBack();
    }
  };

  reset = () => {
    formOptions.fields.version.nullOption = {
      value: '1',
      text: 'Version 1.0'
    };
    formOptions.fields.version.options = [{ value: '2', text: 'Version 2.0' }];
    Card = CardVersion1;
    this.setState({ version: 1, value: null });
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
            onChange={this.onChangeForm}
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
