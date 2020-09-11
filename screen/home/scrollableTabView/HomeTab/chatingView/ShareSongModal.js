import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';
import contents from '../../../../../contents';
import styles from '../../../../../styles';
import {TextInput} from 'react-native-gesture-handler';
import IoniconsIcons from '../../../../../components/IoniconsIcons';

const ShareSongModal = ({
  shareSongModal,
  setshareSongModal,
  currentVideo,
  createShareMusicHandle,
}) => {
  const [value, setValue] = useState('');
  const onCahnge = (text) => {
    setValue(text);
  };
  const [shareVideo, setShareVideo] = useState(null);

  useEffect(() => {
    setShareVideo(currentVideo);
  }, []);

  const closeShareModalHandle = () => {
    setshareSongModal(!shareSongModal);
    setValue('');
  };

  return (
    <Modal
      isVisible={shareSongModal}
      onBackdropPress={() => closeShareModalHandle()}
      onRequestClose={() => closeShareModalHandle()}
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
              justifyContent: 'center',
              alignItems: 'center',
              width: contents.width / 1.4,
              paddingTop: 10,
              paddingBottom: 10,
              borderBottomColor: styles.lightGreyColor,
              borderBottomWidth: 1,
              flexDirection: 'row',
            }}>
            <View style={{marginRight: 15}}>
              <IoniconsIcons
                name={'share-social'}
                color={styles.darkGreyColor}
                size={25}
              />
            </View>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 17,
                color: styles.darkGreyColor,
                textAlign: 'center',
              }}>
              공유하기
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              width: contents.width / 1.4,
              alignItems: 'center',
            }}>
            <Image
              style={{width: 70, height: 70, borderRadius: 20}}
              source={{uri: shareVideo !== null ? shareVideo.thumbnail : null}}
            />
            <Text
              style={{
                color: 'black',
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 17,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {shareVideo !== null ? shareVideo.title : null}
            </Text>
            <Text
              style={{
                color: 'black',
                marginTop: 5,
                paddingLeft: 10,
                paddingRight: 10,
                fontWeight: '700',
                color: styles.darkGreyColor,
                textAlign: 'center',
              }}>
              {shareVideo !== null ? shareVideo.singer : null}
            </Text>
          </View>
          <View style={{marginBottom: 30}}>
            <View style={{width: contents.width / 1.4, alignItems: 'center'}}>
              <TextInput
                value={value}
                onChangeText={onCahnge}
                placeholder={'글 덧붙이기'}
                multiline={true}
                numberOfLines={300}
                placeholderTextColor={styles.darkGreyColor}
                returnKeyType={'none'}
                blurOnSubmit={true}
                onSubmitEditing={() => {
                  if (value === '') {
                    ToastAndroid.show(
                      '검색어를 입력해주세요',
                      ToastAndroid.SHORT,
                    );
                  } else {
                    //   navigation.navigate('SearchDataView', {value});
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
            <TouchableWithoutFeedback onPress={() => closeShareModalHandle()}>
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
                <Text style={{fontWeight: '700', color: 'white', fontSize: 15}}>
                  취소
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                createShareMusicHandle({
                  text: value,
                  videoId: shareVideo.videoId,
                  thumbnail: shareVideo.thumbnail,
                  title: shareVideo.title,
                  singer: shareVideo.singer,
                  duration: shareVideo.duration,
                });
                setValue('');
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
                <Text style={{fontWeight: '700', color: 'white', fontSize: 15}}>
                  확인
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ShareSongModal;
