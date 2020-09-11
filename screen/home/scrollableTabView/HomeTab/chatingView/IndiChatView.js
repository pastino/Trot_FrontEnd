import React, {useState, useEffect} from 'react';
import {
  ToastAndroid,
  View,
  Image,
  Text,
  Vibration,
  Keyboard,
  Animated,
} from 'react-native';
import moment from 'moment';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import styles from '../../../../../styles';
import contents from '../../../../../contents';
import CommentModal from './CommentModal';
import ImageView from './ImageView';
import {Easing} from 'react-native-reanimated';
import MaterialCommunityIcons from '../../../../../components/MaterialCommunityIcons';

const IndiChatView = ({
  chat,
  navigation,
  videos,
  setVieos,
  setMusicNumber,
  musicNumber,
  commentModal,
  setCommentModal,
  setCommentTarget,
  scrollToIndex,
  fcmToken,
  chageNickName,
  shakingIndex,
  index,
}) => {
  const a = moment();
  const b = moment(chat.createdAt);
  const secondCreated = a.diff(b, 'seconds');
  const minuteCreated = a.diff(b, 'minutes'); // 44700
  const hourCreated = a.diff(b, 'hours'); // 745
  const sameDayConfirm =
    moment(a).format('DD') === moment(b).format('DD') ? true : false;

  const dayCreated = a.diff(b, 'days'); // 31
  const weekCreated = a.diff(b, 'weeks'); // 4
  const monthCreated = a.diff(b, 'months');
  const yearCreated = a.diff(b, 'years');

  const [imageModal, setImageModal] = useState(false);

  const clickChatView = () => {
    if (chat.videoId) {
      const videoArray = videos.slice(0);
      const addVideo = [
        ...videoArray.slice(0, musicNumber + 1),
        {
          videoId: chat.videoId,
          thumbnail: chat.thumbnail,
          title: chat.title,
          singer: chat.singer,
          duration: chat.duration,
        },
        ...videoArray.slice(musicNumber + 1),
      ];
      setVieos(addVideo);
      setMusicNumber(musicNumber + 1);
      ToastAndroid.show(
        '플레이 리스트에 추천곡이 추가됐습니다',
        ToastAndroid.SHORT,
      );
    }
  };
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (shakingIndex === index) {
      console.log(shakingIndex, index);
      setTimeout(() => {
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
      }, 300);
    }
  }, [shakingIndex]);

  return chat.delete ? (
    <View
      style={{
        marginLeft: 70,
        padding: 20,
        height: 'auto',
        width: contents.width - 90,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        borderBottomWidth: 0,
      }}>
      <Text
        style={{fontWeight: '700', color: styles.darkGreyColor, fontSize: 12}}>
        글이 삭제되어 블라인드 처리되었습니다.
      </Text>
    </View>
  ) : (
    <>
      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (chat.fcmToken === fcmToken) {
                chageNickName();
              } else {
                if (chat.avatar) {
                  setImageModal(!imageModal);
                } else {
                  ToastAndroid.show('이미지가 없습니다', ToastAndroid.SHORT);
                }
              }
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: styles.lightGreyColor,
              }}
              source={
                chat.avatar === null
                  ? require('../image/noAvatar.png')
                  : {uri: chat.avatar}
              }
            />
          </TouchableWithoutFeedback>
          <View>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>
              <Text
                style={{
                  color: styles.darkGreyColor,
                  fontSize: 12,
                  fontWeight: '700',
                }}>
                {chat.nickName}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  fontSize: 12,
                  color: styles.darkGreyColor,
                  fontWeight: '700',
                }}>
                /
              </Text>
              <Text
                style={{
                  color: styles.darkGreyColor,
                  fontSize: 12,
                }}>
                {secondCreated < 60
                  ? `방금 전`
                  : minuteCreated < 60
                  ? `${minuteCreated}분 전`
                  : !sameDayConfirm && hourCreated < 24
                  ? '어제'
                  : hourCreated < 24
                  ? `${hourCreated}시간 전`
                  : dayCreated < 7
                  ? `${dayCreated}일 전`
                  : weekCreated < 5
                  ? `${weekCreated}주 전`
                  : monthCreated < 12
                  ? `${monthCreated}개월 전`
                  : `${yearCreated}년 전`}
              </Text>
            </View>
            {chat.videoId ? (
              <Animated.View
                style={{
                  height: 'auto',
                  width: contents.width - 90,
                  marginLeft: 10,
                  marginTop: 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                  borderBottomWidth: 0,
                  transform: [
                    {
                      translateX: animatedValue.interpolate({
                        inputRange: [0, 0.25, 0.5, 0.75, 1],
                        outputRange: [10, 20, 10, 20, 10],
                      }),
                    },
                  ],
                }}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    chat.commentTargetId ? scrollToIndex(chat) : null
                  }
                  onLongPress={() => {
                    Vibration.vibrate(20);
                    setCommentModal(!commentModal);
                    setCommentTarget(chat);
                  }}>
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View style={{marginBottom: 20, flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'thumb-up'}
                        size={20}
                        color={'black'}
                      />
                      <Text
                        style={{
                          color: 'black',
                          textAlign: 'center',
                          fontWeight: '700',
                          fontSize: 17,
                          marginLeft: 10,
                        }}>
                        이 곡을 추천합니다
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 20,
                        }}
                        source={{uri: chat.thumbnail}}
                      />

                      <Text style={{fontWeight: '700', marginTop: 10}}>
                        {chat.title}
                      </Text>
                      <Text
                        style={{
                          color: styles.darkGreyColor,
                          textAlign: 'center',
                          paddingRight: 10,
                        }}>
                        {chat.singer}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderTopColor: styles.lightGreyColor,
                      borderTopWidth: 1,
                    }}>
                    <Text
                      style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                      {chat.text}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => clickChatView()}>
                  <View
                    style={{
                      width: contents.width - 90,
                      height: 50,
                      backgroundColor: styles.MainColor,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={{fontWeight: '700', color: 'white'}}>
                        추천곡 듣기
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            ) : (
              <Animated.View
                style={{
                  height: 'auto',
                  width: contents.width - 90,
                  marginLeft: 10,
                  marginTop: 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                  borderBottomWidth: 0,
                  transform: [
                    {
                      translateX: animatedValue.interpolate({
                        inputRange: [0, 0.25, 0.5, 0.75, 1],
                        outputRange: [10, 20, 10, 20, 10],
                      }),
                    },
                  ],
                }}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    chat.commentTargetId ? scrollToIndex(chat) : null
                  }
                  onLongPress={() => {
                    Vibration.vibrate(20);
                    setCommentModal(!commentModal);
                    setCommentTarget(chat);
                  }}>
                  {chat.commentTargetId ? (
                    <View>
                      <View
                        style={{
                          borderBottomColor: styles.lightGreyColor,
                          borderBottomWidth: 1,
                          padding: 10,
                        }}>
                        <Text style={{fontWeight: '700', fontSize: 12}}>
                          "{chat.commentNickName}"님에게 답장
                        </Text>
                        <Text style={{fontSize: 12}}>{chat.commentText}</Text>
                      </View>
                      <Text style={{padding: 10}}>{chat.text}</Text>
                    </View>
                  ) : (
                    <Text style={{padding: 10}}>{chat.text}</Text>
                  )}
                </TouchableWithoutFeedback>
              </Animated.View>
            )}
          </View>
        </View>
      </View>
      <ImageView
        avatar={chat.avatar}
        imageModal={imageModal}
        setImageModal={setImageModal}
        navigation={navigation}
      />
    </>
  );
};

export default IndiChatView;
