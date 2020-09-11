import React, {useState, useEffect, useRef, createRef} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  InteractionManager,
  ToastAndroid,
} from 'react-native';
import IoniconsIcons from '../../../../../components/IoniconsIcons';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import {useSubscription, useQuery, useMutation} from 'react-apollo-hooks';
import {
  SEE_CHAT,
  CREATE_CHAT,
  NEW_CHAT,
  DELETE_CHAT,
} from '../../../../SubQuery';
import contents from '../../../../../contents';
import styles from '../../../../../styles';
import {useKeyboard} from '@react-native-community/hooks';
import ShareSongModal from './ShareSongModal';
import IndiChatView from './IndiChatView';
import CommentModal from './CommentModal';
import LoadingDots from 'react-native-loading-dots';

const ChatingView = ({
  setChatModal,
  chatModal,
  nickNameModal,
  setNickNameModal,
  changeNickNameModal,
  setChangeNickNameModal,
  navigation,
  currentVideo,
  videos,
  setVieos,
  setMusicNumber,
  musicNumber,
  nickName,
  avatar,
  fcmToken,
}) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [shareSongModal, setshareSongModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [commentAdd, setCommentAdd] = useState(false);
  const [commentTarget, setCommentTarget] = useState(null);

  const keyboard = useKeyboard();
  const scrollView = useRef();

  const onChange = (text) => {
    setValue(text);
  };
  const {data: oldMessages, error} = useQuery(SEE_CHAT, {
    // suspend: true,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    setMesaages(oldMessages && oldMessages.seeChat);
  }, [oldMessages]);

  const [mesaages, setMesaages] = useState(
    (oldMessages && oldMessages.seeChat) || [],
  );

  const [sendMassageMutation] = useMutation(CREATE_CHAT, {
    refetchQueries: () => [{query: SEE_CHAT}],
  });

  const {data} = useSubscription(NEW_CHAT);

  const handleNewMessage = () => {
    if (data !== undefined) {
      const {subscriptionChat} = data;
      if (subscriptionChat.delete) {
        setMesaages((previous) => {
          const index = previous
            .map((m) => m.id)
            .findIndex((item) => item === subscriptionChat.id);
          return [
            ...previous.slice(0, index),
            subscriptionChat,
            ...previous.slice(index + 1),
          ];
        });
      } else {
        setMesaages((previous) => [subscriptionChat, ...previous]);
      }
    }
  };

  useEffect(() => {
    handleNewMessage();
  }, [data]);

  const confirmNickNameExist = async () => {
    if (nickName === null) {
      setNickNameModal(!nickNameModal);
    }
  };

  const chageNickName = async () => {
    setChangeNickNameModal(!changeNickNameModal);
  };

  const submitHandle = async () => {
    setIsLoading(true);
    setValue('');
    Keyboard.dismiss();
    scrollView.current.scrollToIndex({animated: true, index: 0});
    if (commentAdd) {
      await sendMassageMutation({
        variables: {
          fcmToken,
          nickName,
          avatar,
          text: value,
          commentTargetId: commentTarget.id,
          commentText: commentTarget.text,
          commentNickName: commentTarget.nickName,
        },
      });
    } else {
      await sendMassageMutation({
        variables: {
          fcmToken,
          nickName,
          avatar,
          text: value,
        },
      });
    }
    setIsLoading(false);
  };

  const createShareMusicHandle = async ({
    text,
    videoId,
    thumbnail,
    title,
    singer,
    duration,
  }) => {
    scrollView.current.scrollToIndex({animated: true, index: 0});
    setIsLoading(true);
    setshareSongModal(!shareSongModal);
    await sendMassageMutation({
      variables: {
        fcmToken,
        nickName,
        avatar,
        text,
        videoId,
        thumbnail,
        title,
        singer,
        duration,
      },
    });
    setIsLoading(false);
  };

  const closeChattingView = async () => {
    setChatModal(!chatModal);
  };

  const textInputKeyboard = createRef();

  const cancleCommentHandle = () => {
    setCommentTarget(null);
    setCommentAdd(!commentAdd);
  };

  const keyboardShowHandle = () => {
    setCommentModal(!commentModal);
    setCommentAdd(!commentAdd);
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        textInputKeyboard.current.focus();
      }, 100);
    });
  };

  useEffect(() => {
    if (keyboard.keyboardShown === false) {
      setCommentTarget(null);
      setCommentAdd(false);
    } else {
      null;
    }
  }, [keyboard.keyboardShown]);

  const [deleteChatMutation] = useMutation(DELETE_CHAT);

  const deleteChatHandle = async () => {
    setDelLoading(true);
    await deleteChatMutation({
      variables: {
        chatId: commentTarget.id,
        fcmToken,
      },
    });
    setCommentModal(!commentModal);
    setDelLoading(false);
    setCommentTarget(null);
    setCommentAdd(false);
  };

  const [shakingIndex, setShakingIndex] = useState(null);

  const scrollToIndex = (chat) => {
    const index = mesaages
      .map((m) => m.id)
      .findIndex((i) => i === chat.commentTargetId);
    if (index === -1) {
      ToastAndroid.show(
        '글이 초과되어 해당 글을 찾을 수 없습니다',
        ToastAndroid.SHORT,
      );
    } else {
      setTimeout(() => {
        scrollView.current.scrollToIndex({
          animated: true,
          index,
          viewPosition: 0.5,
        });
        setShakingIndex(index);
      }, 100);
      setTimeout(() => {
        setShakingIndex(null);
      }, 1000);
    }
  };
  const [textinputHeight, setTextinputHeight] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: contents.width,
          flexDirection: 'row',
          alignItems: 'center',
          height: 45,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (nickName) {
              setshareSongModal(!shareSongModal);
            } else {
              setNickNameModal(!nickNameModal);
            }
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: contents.width - 100,
              backgroundColor: styles.MainColor,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IoniconsIcons name={'share-social'} color={'white'} size={20} />
            <Text
              style={{
                fontWeight: '700',
                fontSize: 15,
                marginLeft: 20,
                color: 'white',
              }}>
              지금 듣고 있는 노래 공유하기
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => closeChattingView()}>
          <View
            style={{
              width: 100,
              height: 45,
              backgroundColor: styles.Wine,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <IoniconsIcons name={'close'} size={25} color={'white'} />
            <Text
              style={{
                fontWeight: '700',
                fontSize: 15,
                color: 'white',
              }}>
              나가기
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : null}>
        <FlatList
          data={mesaages}
          style={{flex: 1}}
          ref={scrollView}
          inverted={true}
          onScrollToIndexFailed={() =>
            ToastAndroid.show(
              '글이 초과되어 해당 글을 찾을 수 없습니다',
              ToastAndroid.SHORT,
            )
          }
          keyExtractor={(item) => Math.random().toString()}
          // getItemLayout={this.getItemLayout}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                height: contents.height - contents.width / 2.31 - 45 - 55,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  transform: [{scaleY: -1}],
                  fontSize: 15,
                  marginBottom: 50,
                  color: styles.darkGreyColor,
                }}>
                채팅방에 입장 중입니다
              </Text>
              {/* <ActivityIndicator color={'black'} size={30} /> */}
              <LoadingDots
                dots={4}
                colors={[
                  styles.darkGreyColor,
                  styles.darkGreyColor,
                  styles.darkGreyColor,
                  styles.darkGreyColor,
                ]}
                size={15}
              />
            </View>
          )}
          renderItem={({item, index}) => (
            <IndiChatView
              chat={item}
              navigation={navigation}
              videos={videos}
              setVieos={setVieos}
              setMusicNumber={setMusicNumber}
              musicNumber={musicNumber}
              commentModal={commentModal}
              setCommentModal={setCommentModal}
              setCommentTarget={setCommentTarget}
              scrollToIndex={scrollToIndex}
              fcmToken={fcmToken}
              chageNickName={chageNickName}
              shakingIndex={shakingIndex}
              index={index}
            />
          )}
        />
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          {commentAdd ? (
            <View
              style={{
                width: contents.width,
                padding: 10,
                paddingRight: 47,
                borderTopColor: styles.lightGreyColor,
                borderTopWidth: 1,
              }}>
              <Text style={{fontWeight: '700', fontSize: 12}}>
                {commentTarget.nickName}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  color: styles.darkGreyColor,
                  fontSize: 12,
                  marginTop: 5,
                }}>
                {commentTarget.text}
              </Text>
              <TouchableWithoutFeedback onPress={() => cancleCommentHandle()}>
                <View style={{position: 'absolute', right: 10, top: 5}}>
                  <IoniconsIcons name={'close'} size={30} color={'black'} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : null}
          {nickName ? (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                ref={textInputKeyboard}
                value={value}
                onChangeText={onChange}
                placeholder={
                  commentAdd
                    ? '답글을 적어보세요.'
                    : '하고 싶은 말을 적어보세요.'
                }
                placeholderTextColor={styles.darkGreyColor}
                returnKeyType={'none'}
                multiline={true}
                numberOfLines={300}
                blurOnSubmit={true}
                // onSubmitEditing={() => submitHandle()}
                onContentSizeChange={(event) => {
                  setTextinputHeight(event.nativeEvent.contentSize.height);
                }}
                style={{
                  width: contents.width - 80,
                  borderTopColor: styles.lightGreyColor,
                  borderTopWidth: 1,
                  height:
                    Math.max(35, textinputHeight) > 100
                      ? 100
                      : Math.max(35, textinputHeight),
                  padding: 10,
                  paddingLeft: commentAdd ? 50 : null,
                  fontSize: 17,
                  textAlignVertical: 'top',
                  color: 'black',
                  backgroundColor: 'white',
                  justifyContent: 'flex-start',
                }}
              />
              {commentAdd ? (
                <View
                  style={{
                    position: 'absolute',
                    height: 55,
                    left: 10,
                    justifyContent: 'center',
                  }}>
                  <IoniconsIcons
                    name={'return-down-forward-outline'}
                    size={30}
                  />
                </View>
              ) : null}

              <TouchableWithoutFeedback
                disabled={value ? false : true}
                onPress={() => submitHandle()}>
                <View
                  style={{
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopColor: styles.lightGreyColor,
                    borderTopWidth: 1,
                    backgroundColor: value
                      ? styles.MainColor
                      : styles.darkGreyColor,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 15,
                      color: 'white',
                    }}>
                    전송
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <TouchableWithoutFeedback onPress={() => confirmNickNameExist()}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: contents.width - 80,
                    borderTopColor: styles.lightGreyColor,
                    borderTopWidth: 1,
                    height: 55,
                    padding: 10,
                    fontSize: 17,
                    color: 'black',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: styles.darkGreyColor, fontSize: 17}}>
                    하고 싶은 말을 적어보세요.
                  </Text>
                </View>
                <View
                  style={{
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopColor: styles.lightGreyColor,
                    borderTopWidth: 1,
                    backgroundColor: styles.MainColor,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 15,
                      color: 'white',
                    }}>
                    전송
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </KeyboardAvoidingView>
      <ShareSongModal
        shareSongModal={shareSongModal}
        setshareSongModal={setshareSongModal}
        currentVideo={currentVideo}
        createShareMusicHandle={createShareMusicHandle}
      />
      <CommentModal
        commentModal={commentModal}
        setCommentModal={setCommentModal}
        keyboardShowHandle={keyboardShowHandle}
        fcmToken={fcmToken}
        commentTarget={commentTarget}
        deleteChatHandle={deleteChatHandle}
        delLoading={delLoading}
        nickName={nickName}
        nickNameModal={nickNameModal}
        setNickNameModal={setNickNameModal}
      />
    </View>
  );
};

export default ChatingView;
