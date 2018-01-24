import { Platform } from 'react-native';
import t from 'tcomb-form-native';
import colors from './colors';

t.form.Form.stylesheet.textbox.normal.color = colors.primary;
t.form.Form.stylesheet.textbox.error.color = colors.primary;

t.form.Form.stylesheet.errorBlock.backgroundColor = 'transparent';

t.form.Form.stylesheet.controlLabel.normal.backgroundColor = 'transparent';
t.form.Form.stylesheet.controlLabel.normal.color = colors.primary;
t.form.Form.stylesheet.controlLabel.normal.fontSize = 20;
t.form.Form.stylesheet.controlLabel.normal.marginBottom = 15;

t.form.Form.stylesheet.controlLabel.error.backgroundColor = 'transparent';
t.form.Form.stylesheet.controlLabel.error.fontSize = 20;
t.form.Form.stylesheet.controlLabel.error.marginBottom = 15;

t.form.Form.stylesheet.checkbox.normal.flexDirection = 'row';
t.form.Form.stylesheet.checkbox.error.flexDirection = 'row';
t.form.Form.stylesheet.checkbox.normal.flex = 1;
t.form.Form.stylesheet.checkbox.error.flex = 1;

t.form.Form.stylesheet.pickerValue.normal.color = colors.primary;

export default t;
