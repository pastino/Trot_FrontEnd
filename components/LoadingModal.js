import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
import contents from "../contents";

const LoadingModal = ({ isLoading, loadingText }) => {
  return isLoading ? (
    <Modal isVisible={isLoading} transparent={true}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={"white"} size={50} />
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              width: contents.width / 1.3,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text>{loadingText} </Text>
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
};

export default LoadingModal;
