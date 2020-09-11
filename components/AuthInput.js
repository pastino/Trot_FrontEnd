import React from "react";
import styled from "styled-components";
import contents from "../contents";
import Proptypes from "prop-types";

const View = styled.View``;

const TextInput = styled.TextInput`
  width: ${contents.width / 1.9};
  height: ${contents.height / 20};
  background-color: ${props => props.theme.lightGreyColor};
  border-radius: ${props => props.theme.ButtonInputRadius};
  padding-left: 10px;
`;

const AuthInput = ({
  value,
  placeholder,
  onChange,
  keyboardType,
  maxLength,
  autoCompleteType,
  autoCapitalize,
  secureTextEntry,
  textContentType,
  editable
}) => (
  <View>
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChange}
      keyboardType={keyboardType}
      maxLength={maxLength}
      autoCompleteType={autoCompleteType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      textContentType={textContentType}
      editable={editable}
    ></TextInput>
  </View>
);

AuthInput.Proptypes = {
  value: Proptypes.string.isRequired,
  placeholder: Proptypes.string.isRequired,
  onChangeText: Proptypes.string.isRequired,
  keyboardType: Proptypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  maxLength: Proptypes.number,
  autoCompleteType: Proptypes.oneOf([
    "off",
    "username",
    "password",
    "email",
    "name",
    "tel",
    "street-address",
    "postal-code",
    "cc-number",
    "cc-csc",
    "cc-exp",
    "cc-exp-month",
    "cc-exp-year"
  ]),
  autoCapitalize: Proptypes.oneOf(["characters", "words", "sentences", "none"])
};

export default AuthInput;
