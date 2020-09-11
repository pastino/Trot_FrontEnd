import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  ToastAndroid,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import contents from '../../../../../contents';
import styles from '../../../../../styles';
import ImagePicker from 'react-native-image-picker';
import options from '../../../../../apollo';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingModal from '../../../../../components/LoadingModal';
import {TextInput} from 'react-native-gesture-handler';

const ChangeNickNameModal = ({
  setNickName,
  nickName,
  setAvatar,
  avatar,
  changeNickNameModal,
  setChangeNickNameModal,
}) => {
  const [value, setValue] = useState(nickName);
  const [image, setImage] = useState(avatar);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue(nickName);
  }, [nickName]);

  useEffect(() => {
    setImage(avatar);
  }, [avatar]);

  const onCahnge = (text) => {
    setValue(text);
  };

  const imageOptions = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    maxWidth: 500,
    maxHeight: 500,
    quality: 0.5,
  };

  const imagePick = () => {
    ImagePicker.launchImageLibrary(imageOptions, (response) => {
      if (response.path === undefined) {
        null;
      } else {
        setImage('file://' + response.path);
      }
    });
  };

  const createProgramBoxHandle = async () => {
    if (value === '') {
      ToastAndroid.show('닉네임을 입력해주세요', ToastAndroid.SHORT);
    } else if (value.length > 10) {
      ToastAndroid.show(
        '닉네임 글자수는 10자리 이하로 입력 부탁드립니다',
        ToastAndroid.SHORT,
      );
    } else if (value === nickName && image === avatar) {
      ToastAndroid.show('변동사항이 없습니다', ToastAndroid.SHORT);
    } else {
      if (image) {
        const formData = new FormData();
        formData.append('file', {
          name: 'image',
          type: 'image/jpeg',
          uri: image,
        });

        try {
          setIsLoading(true);
          const {
            data: {location},
          } = await axios.post(
            options.httpLink.toString() + 'api/upload',
            formData,
            {
              headers: {
                'content-type': 'multipart/form-data',
              },
            },
          );
          await AsyncStorage.setItem('avatar', location[0]);
          await AsyncStorage.setItem('nickName', value);
          setNickName(value);
          setAvatar(location[0]);
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      } else {
        await AsyncStorage.setItem('nickName', value);
        setNickName(value);
      }

      setChangeNickNameModal(!changeNickNameModal);

      ToastAndroid.show(
        '생성이 완료되었습니다. 글을 남겨보세요.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <>
      <Modal
        isVisible={changeNickNameModal}
        onBackdropPress={() => setChangeNickNameModal(!changeNickNameModal)}
        onRequestClose={() => setChangeNickNameModal(!changeNickNameModal)}
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
            <View
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <Text style={{fontWeight: '700', fontSize: 20}}>정보 변경</Text>
            </View>
            <View style={{paddingTop: 20}}>
              <Text style={{textAlign: 'center', color: styles.darkGreyColor}}>
                닉네임 및 프로필 이미지 변경 시
              </Text>
              <Text style={{textAlign: 'center', color: styles.darkGreyColor}}>
                변경 후 확인 버튼을 눌러주세요.
              </Text>
            </View>

            <View style={{marginTop: 20, marginBottom: 30}}>
              <View style={{width: contents.width / 1.4, alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 12,
                    paddingBottom: 10,
                  }}>
                  프로필 이미지
                </Text>
                <TouchableWithoutFeedback onPress={() => imagePick()}>
                  <Image
                    source={
                      !image ? require('../image/noAvatar.png') : {uri: image}
                    }
                    style={{width: 60, height: 60, borderRadius: 30}}
                  />
                </TouchableWithoutFeedback>
              </View>

              <View style={{width: contents.width / 1.4, alignItems: 'center'}}>
                <TextInput
                  value={value}
                  onChangeText={onCahnge}
                  placeholder={'닉네임'}
                  placeholderTextColor={styles.darkGreyColor}
                  returnKeyType={'send'}
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    if (value === '') {
                      ToastAndroid.show(
                        '검색어를 입력해주세요',
                        ToastAndroid.SHORT,
                      );
                    } else {
                      null;
                    }
                  }}
                  style={{
                    width: contents.width / 2,
                    height: 43,
                    padding: 10,
                    marginTop: 30,
                    color: 'black',
                    backgroundColor: 'white',
                    justifyContent: 'flex-start',
                    textAlignVertical: 'top',
                    shadowColor: 'white',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 2,
                    borderBottomLeftRadius: 2,
                    borderTopLeftRadius: 2,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderBottomWidth: 0,
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={() => setChangeNickNameModal(!changeNickNameModal)}>
                <View
                  style={{
                    width: contents.width / 1.4 / 2,
                    height: 51,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: styles.MainColor,
                    borderBottomLeftRadius: 20,
                    borderRightColor: 'white',
                    borderRightWidth: 1,
                  }}>
                  <Text
                    style={{fontWeight: '700', color: 'white', fontSize: 15}}>
                    취소
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  createProgramBoxHandle();
                }}>
                <View
                  style={{
                    width: contents.width / 1.4 / 2,
                    height: 51,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: styles.MainColor,
                    borderBottomRightRadius: 20,
                  }}>
                  <Text
                    style={{fontWeight: '700', color: 'white', fontSize: 15}}>
                    확인
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </Modal>
      <LoadingModal isLoading={isLoading} loadingText={'수정중입니다'} />
    </>
  );
};

export default ChangeNickNameModal;
