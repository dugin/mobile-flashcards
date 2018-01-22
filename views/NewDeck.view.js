import React from 'react';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import colors from './../styles/colors';
import { Btn, BtnText } from '../styles/styles';
import { addDeck } from '../actions/deck.action';
import { ROUTES } from '../routes';

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
      error: '* Deck Title is required'
    }
  }
};

class NewDeck extends React.Component {
  handleSubmit = () => {
    const value = this.form.getValue();
    if (value) {
      this.props.dispatch(
        addDeck({
          [value.title]: {
            title: value.title,
            questions: []
          }
        })
      );

      this.clearForms();
      this.navigateHome();
    }
  };

  clearForms() {
    this.setState({ value: null });
  }

  navigateHome() {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: ROUTES.DECKLIST })]
      })
    );
  }

  render() {
    return (
      <ViewContainer behavior="padding">
        <Form
          ref={c => {
            this.form = c;
          }}
          type={Deck}
          options={formOptions}
        />
        <Btn onPress={this.handleSubmit}>
          <BtnText> Create Deck</BtnText>
        </Btn>
      </ViewContainer>
    );
  }
}

export default connect()(NewDeck);
