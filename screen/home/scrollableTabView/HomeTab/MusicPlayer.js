import React, {useEffect, useState, createRef, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ToastAndroid,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import contents from '../../../../contents';
import styles from '../../../../styles';
import IoniconsIcons from '../../../../components/IoniconsIcons';
import MaterialComIcons from '../../../../components/MaterialComIcons';
import FontistoIcons from '../../../../components/FontistoIcons';
import KaKaoButton from '../../../../components/kakaoLink/KaKaoButton';
import AndroidPip from 'react-native-android-pip';
import useAppState from 'react-native-appstate-hook';
import MaterialCommunityIcons from '../../../../components/MaterialCommunityIcons';
import YoutubePlayer from 'react-native-youtube-iframe';
import ChatingView from '../HomeTab/chatingView/ChatingView';
import NickNameModal from './chatingView/NickNameModal';
import ChangeNickNameModal from './chatingView/ChangeNickNameModal';
import AsyncStorage from '@react-native-community/async-storage';

const MusicPlayer = ({navigation, navigation: {goBack}}) => {
  const navVideos = navigation.getParam('videos');
  const [videos, setVieos] = useState(navVideos);
  const division = navigation.getParam('division');

  const [playType, setPlayType] = useState('allOnce');
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [shuffleNum, setShuffleNum] = useState(null);
  const [playPuase, setPlayPuase] = useState(true);
  const [musicNumber, setMusicNumber] = useState(0);

  const [chatModal, setChatModal] = useState(false);
  const [nickNameModal, setNickNameModal] = useState(false);
  const [changeNickNameModal, setChangeNickNameModal] = useState(false);
  const [nickName, setNickName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);

  const scrollView = useRef();

  const nickNameSetting = async () => {
    const getNickName = await AsyncStorage.getItem('nickName');
    const getAvatar = await AsyncStorage.getItem('avatar');
    const getFcmToken = await AsyncStorage.getItem('fcmToken');
    if (getNickName) {
      setNickName(getNickName);
    }
    if (getAvatar) {
      setAvatar(getAvatar);
    }
    if (getFcmToken) {
      setFcmToken(getFcmToken);
    }
  };

  useEffect(() => {
    nickNameSetting();
  }, []);

  const reapeatHandle = () => {
    if (playType === 'allOnce') {
      setPlayType('repeatAll');
      setLoop(false);
    } else if (playType === 'repeatAll') {
      setPlayType('repeatOnce');
      setLoop(true);
    } else {
      setPlayType('allOnce');
      setLoop(false);
    }
  };

  const autoPlayHandle = ({musicNumber}) => {
    if (!shuffle) {
      if (playType === 'allOnce' && musicNumber + 1 === videos.length) {
        ToastAndroid.show('마지막 음악입니다.', ToastAndroid.SHORT);
      } else if (
        playType === 'repeatAll' &&
        musicNumber + 1 === videos.length
      ) {
        setMusicNumber(0);
      } else {
        setMusicNumber(musicNumber + 1);
      }
    } else {
      if (
        playType === 'allOnce' &&
        musicNumber === shuffleNum[shuffleNum.length - 1]
      ) {
        ToastAndroid.show('마지막 음악입니다.', ToastAndroid.SHORT);
      } else if (
        playType === 'repeatAll' &&
        musicNumber === shuffleNum[shuffleNum.length - 1]
      ) {
        setMusicNumber(shuffleNum[0]);
      } else {
        const preNum = shuffleNum.findIndex((obj) => obj === musicNumber);
        setMusicNumber(shuffleNum[preNum + 1]);
      }
    }
    setPlayPuase(true);
  };

  const previousVideoHandle = () => {
    if (!shuffle) {
      if (musicNumber === 0) {
        ToastAndroid.show('첫번째 음악입니다.', ToastAndroid.SHORT);
      } else {
        setMusicNumber(musicNumber - 1);
      }
    } else {
      if (musicNumber === shuffleNum[0]) {
        ToastAndroid.show('첫번째 음악입니다.', ToastAndroid.SHORT);
      } else {
        const preNum = shuffleNum.findIndex((obj) => obj === musicNumber);

        setMusicNumber(shuffleNum[preNum - 1]);
      }
    }
  };

  const nextVideoHandle = ({musicNumber}) => {
    if (!shuffle) {
      if (playType === 'allOnce' && musicNumber + 1 === videos.length) {
        ToastAndroid.show('마지막 음악입니다.', ToastAndroid.SHORT);
      } else if (
        playType === 'repeatAll' &&
        musicNumber + 1 === videos.length
      ) {
        setMusicNumber(0);
      } else if (playType === 'repeatOnce') {
        ToastAndroid.show('한곡 반복재생 중 입니다.', ToastAndroid.SHORT);
      } else {
        setMusicNumber(musicNumber + 1);
      }
    } else {
      if (
        playType === 'allOnce' &&
        musicNumber === shuffleNum[shuffleNum.length - 1]
      ) {
        ToastAndroid.show('마지막 음악입니다.', ToastAndroid.SHORT);
      } else if (
        playType === 'repeatAll' &&
        musicNumber === shuffleNum[shuffleNum.length - 1]
      ) {
        setMusicNumber(shuffleNum[0]);
      } else if (playType === 'repeatOnce') {
        ToastAndroid.show('한곡 반복재생 중 입니다.', ToastAndroid.SHORT);
      } else {
        const preNum = shuffleNum.findIndex((obj) => obj === musicNumber);

        setMusicNumber(shuffleNum[preNum + 1]);
      }
    }
  };

  const randomNumHandle = (index) => {
    let Num = [];
    let i = 0;
    while (i < videos.length) {
      if (i === 0) {
        Num.push(index !== null && index !== undefined ? index : musicNumber);
        i++;
      } else {
        let n = Math.floor(Math.random() * videos.length);
        if (!Num.includes(n)) {
          Num.push(n);
          i++;
        }
      }
    }
    setShuffleNum(Num);
  };

  useEffect(() => {
    randomNumHandle();
  }, []);

  const {appState} = useAppState({
    onChange: (newAppState) => {},
    onForeground: () => console.log('App went to Foreground'),
    onBackground: () => {
      nickNameModal || changeNickNameModal
        ? null
        : AndroidPip.enterPictureInPictureMode();
    },
  });

  const [darkModeModal, setDarkModeModal] = useState(false);

  const backAction = () => {
    if (chatModal) {
      setChatModal(!chatModal);
    } else {
      navigation.navigate('Home');
    }
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  useEffect(() => {
    if (chatModal) {
      null;
    } else {
      setTimeout(() => {
        scrollView.current.scrollToIndex({
          animated: true,
          index: musicNumber,
          viewPosition: 0.5,
        });
      }, 100);
    }
  }, [musicNumber]);

  return videos.length === 0 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={'black'} size={30} />
    </View>
  ) : (
    <>
      <View
        style={{
          width: chatModal && appState === 'active' ? contents.width : null,
          justifyContent: chatModal && appState === 'active' ? 'center' : null,
          alignItems: chatModal && appState === 'active' ? 'center' : null,
          backgroundColor: chatModal && appState === 'active' ? 'black' : null,
        }}>
        <YoutubePlayer
          webViewStyle={{
            flex: 1,
            alignSelf: 'stretch',
            width:
              chatModal && appState === 'active' ? contents.width / 1.3 : null,
          }}
          height={
            darkModeModal
              ? 0
              : chatModal && appState === 'active'
              ? contents.width / 2.31
              : contents.width / 1.77
          }
          videoId={`${videos[musicNumber].videoId}?autoplay=1`}
          playList={videos.map((video) => video.videoId)}
          playListStartIndex={musicNumber}
          autoplay={true}
          onReady={
            () => null
            // console.log('ready')
          }
          play={playPuase}
          onChangeState={(e) => {
            // console.log(e);
            if (e === 'ended') {
              autoPlayHandle({musicNumber});
            }
          }}
          initialPlayerParams={{
            controls: true,
          }}
          userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
          playbackRate={1}
        />
      </View>
      {appState === 'background' ? null : chatModal ? (
        <ChatingView
          chatModal={chatModal}
          setChatModal={setChatModal}
          nickNameModal={nickNameModal}
          setNickNameModal={setNickNameModal}
          changeNickNameModal={changeNickNameModal}
          setChangeNickNameModal={setChangeNickNameModal}
          navigation={navigation}
          currentVideo={videos[musicNumber]}
          videos={videos}
          setVieos={setVieos}
          setMusicNumber={setMusicNumber}
          musicNumber={musicNumber}
          nickName={nickName}
          setNickName={setNickName}
          avatar={avatar}
          setAvatar={setAvatar}
          fcmToken={fcmToken}
          setFcmToken={setFcmToken}
        />
      ) : darkModeModal ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'black',
            paddingTop: 40,
          }}>
          <TouchableWithoutFeedback onPress={() => setDarkModeModal(false)}>
            <Text style={{fontWeight: '700', fontSize: 20, color: 'white'}}>
              절전모드 해제
            </Text>
          </TouchableWithoutFeedback>
        </View>
      ) : appState === 'background' ? null : (
        <View style={{flex: 1}}>
          <View
            style={{
              width: contents.width,
              flexDirection: 'row',
              backgroundColor: 'white',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setShuffle(!shuffle);
                if (shuffleNum.length === 0) {
                  randomNumHandle();
                }
              }}>
              <View>
                <IoniconsIcons
                  name={'shuffle'}
                  size={40}
                  color={shuffle ? 'black' : styles.darkGreyColor}
                />
                <Text style={{fontSize: 10}}>
                  {shuffle ? '랜덤재생' : '순차재생'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                previousVideoHandle({musicNumber});
              }}>
              <View style={{}}>
                <IoniconsIcons name={'md-play-skip-back-sharp'} size={40} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setDarkModeModal(true);
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name={'battery-high'}
                  size={40}
                  color={'#04C000'}
                />
                <Text
                  style={{fontSize: 10, fontWeight: '700', color: '#04C000'}}>
                  절전모드
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                nextVideoHandle({musicNumber});
              }}>
              <View>
                <IoniconsIcons name={'md-play-skip-forward-sharp'} size={40} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                reapeatHandle();
              }}>
              <View>
                {playType === 'repeatOnce' ? (
                  <MaterialComIcons name={'repeat-once'} size={40} />
                ) : playType === 'allOnce' ? (
                  <>
                    <FontistoIcons name={'arrow-right-l'} size={40} />
                    <View
                      style={{
                        position: 'absolute',
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: 13, fontWeight: '700'}}>A</Text>
                    </View>
                  </>
                ) : playType === 'repeatAll' ? (
                  <>
                    <MaterialComIcons name={'repeat'} size={40} />
                    <View
                      style={{
                        position: 'absolute',
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: 12, fontWeight: '700'}}>A</Text>
                    </View>
                  </>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <FlatList
            data={videos !== undefined ? videos : []}
            style={{flex: 1}}
            getItemLayout={(item, index) => {
              return {
                length: 76.9,
                index,
                offset: index * 76.9,
              };
            }}
            ref={scrollView}
            keyExtractor={(item) => Math.random().toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  height: 500,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={'black'} size={40} />
              </View>
            )}
            renderItem={({item, index}) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setMusicNumber(index);
                  randomNumHandle(index);
                }}
                key={Math.random().toString()}>
                <View
                  style={{
                    width: contents.width,
                    height: 77,
                    borderBottomColor: styles.lightGreyColor,
                    borderBottomWidth: 1,
                    backgroundColor:
                      musicNumber === index ? styles.lightGreyColor : 'white',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: contents.width / 1.2,
                      marginLeft: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      resizeMode={'cover'}
                      source={{
                        uri: item.thumbnail,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 20,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        paddingTop: 7,
                        paddingLeft: 5,
                        paddingRight: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          width: contents.width / 1.3 - 60,
                          fontWeight: '700',
                        }}
                        ellipsizeMode="tail"
                        numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          width: contents.width / 1.3 - 60,
                          color: styles.darkGreyColor,
                          marginTop: 5,
                        }}
                        ellipsizeMode="tail"
                        numberOfLines={1}>
                        {item.singer}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 77,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: styles.darkGreyColor}}>
                        {item.duration}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              setChatModal(!chatModal);
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 15,
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: styles.MainColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IoniconsIcons name={'chatbox'} color={'white'} size={30} />
                <Text style={{fontWeight: '700', fontSize: 12, color: 'white'}}>
                  채팅방
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <KaKaoButton />
        </View>
      )}
      <NickNameModal
        nickNameModal={nickNameModal}
        setNickNameModal={setNickNameModal}
        setNickName={setNickName}
        avatar={avatar}
        setAvatar={setAvatar}
      />
      <ChangeNickNameModal
        nickName={nickName}
        setNickName={setNickName}
        avatar={avatar}
        setAvatar={setAvatar}
        changeNickNameModal={changeNickNameModal}
        setChangeNickNameModal={setChangeNickNameModal}
      />
    </>
  );
};

export default MusicPlayer;
