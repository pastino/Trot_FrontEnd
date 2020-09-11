import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import contents from '../../../../../contents';
import styles from '../../../../../styles';
import {TextInput} from 'react-native-gesture-handler';
import IoniconsIcons from '../../../../../components/IoniconsIcons';
import Clipboard from '@react-native-community/clipboard';

const CommentModal = ({
  commentModal,
  setCommentModal,
  keyboardShowHandle,
  fcmToken,
  commentTarget,
  deleteChatHandle,
  delLoading,
  nickName,
  nickNameModal,
  setNickNameModal,
}) => {
  const closeCommentModalHandle = () => {
    setCommentModal(!commentModal);
  };

  const copyToClipboard = () => {
    Clipboard.setString(commentTarget.text);
    closeCommentModalHandle();
  };

  return (
    <Modal
      isVisible={commentModal}
      onBackdropPress={() => closeCommentModalHandle()}
      onRequestClose={() => closeCommentModalHandle()}
      transparent={true}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: contents.width / 1.4,
            height: 'auto',
          }}>
          {delLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: contents.width / 1.4,

                paddingTop: 30,
                paddingBottom: 30,
                //   flexDirection: 'row',
              }}>
              <ActivityIndicator color={'black'} size={25} />
              <Text style={{marginTop: 20}}>삭제중입니다</Text>
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: contents.width / 1.4,
                paddingTop: 10,
                paddingBottom: 10,
                //   flexDirection: 'row',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (!nickName) {
                    setNickNameModal(!nickNameModal);
                    setCommentModal(!commentModal);
                  } else {
                    keyboardShowHandle();
                  }
                }}>
                <View style={{padding: 20}}>
                  <Text>답글</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => copyToClipboard()}>
                <View style={{padding: 20}}>
                  <Text>복사</Text>
                </View>
              </TouchableWithoutFeedback>
              {commentTarget !== null ? (
                fcmToken === commentTarget.fcmToken ? (
                  <TouchableWithoutFeedback onPress={() => deleteChatHandle()}>
                    <View style={{padding: 20}}>
                      <Text>삭제</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ) : null
              ) : null}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;
