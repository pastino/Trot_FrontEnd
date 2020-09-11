import React from "react";
import styled from "styled-components";
import contents from "../contents";
import { TouchableOpacity } from "react-native-gesture-handler";
import Proptypes from "prop-types";
import { ActivityIndicator } from "react-native";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.rightBlack};
  width: ${contents.width / 2.3};
  height: ${contents.width / 10};
  border-radius: ${(props) => props.theme.ButtonInputRadius};
`;

const Text = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 700;
`;

const AuthButton = ({ loading = false, text, onPress, style }) => (
  <TouchableOpacity disabled={loading} onPress={onPress}>
    <Container>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </TouchableOpacity>
);

AuthButton.propTypes = {
  loading: Proptypes.bool,
  text: Proptypes.string.isRequired,
  onPress: Proptypes.func.isRequired,
};

export default AuthButton;
