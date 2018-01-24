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
      const deck = {
        title: value.title,
        questions: []
      };

      this.props.dispatch(
        addDeck({
          [value.title]: deck
        })
      );

      this.onNavigate(deck);

      this.clearForms();
    }
  };

  clearForms() {
    this.setState({ value: null });
  }

  onNavigate(item) {
    this.props.navigation.navigate(ROUTES.DECK, { item });
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
