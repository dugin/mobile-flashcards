module.exports = {
  extends: ['airbnb', 'prettier'],

  rules: {
    'react/jsx-filename-extension': false,
    'comma-dangle': 0,
    'arrow-parens': 0,
    'no-plusplus': 0,
    'react/jsx-uses-vars': ['error'],
    'function-paren-newline': 0
  },
  parser: 'babel-eslint'
};
