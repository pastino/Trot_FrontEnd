import React, {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView, ActivityIndicator} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import contents from '../../../../contents';
import FastImage from 'react-native-fast-image';
import styles from '../../../../styles';
import LoadingModal from '../../../../components/LoadingModal';
import ProgramView from './mainView/ProgramView';
import IoniconsIcons from '../../../../components/IoniconsIcons';
import GenerationView from './mainView/GenerationView';
import {useQuery} from 'react-apollo-hooks';
import {SEE_PROGRAM_BOX} from '../../../Query';
import YoutubePlayer from 'react-native-youtube-iframe';
import LatestVideoView from './mainView/latestVideoView/LatestVideoView';

const MainView = ({
  main,
  mainViewVideoLoading,
  navigation,
  setScrollableLock,
  favorite,
  setFavorite,
}) => {
  const [addProgram, setAddProgram] = useState(false);

  const {data, loading} = useQuery(SEE_PROGRAM_BOX, {
    variables: {
      division: 'prod',
    },
    fetchPolicy: 'network-only',
  });

  return mainViewVideoLoading ? (
    <LoadingModal
      isLoading={mainViewVideoLoading}
      loadingText={'데이터를 불러오는 중입니다.'}
    />
  ) : (
    <>
      <ScrollView
        onScroll={async (e) => {
          let paddingToBottom = 350;
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (
            e.nativeEvent.contentOffset.y + paddingToBottom >=
            e.nativeEvent.contentSize.height
          ) {
            setScrollableLock(true);
          } else {
            setScrollableLock(false);
          }
        }}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          {/* <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('RecoVideoPlayer', {
                data: main,
              })
            }> */}
          <View
            style={{
              borderBottomColor: styles.lightGreyColor,
              borderBottomWidth: 10,
            }}>
            <View
              style={{
                marginBottom: 7,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: styles.blackColor,
                  fontWeight: '700',
                  paddingLeft: 20,
                  fontSize: 20,
                  padding: 10,
                }}>
                "오늘의 추천영상"
              </Text>
            </View>
            {/* <FastImage
                style={{width: contents.width, height: 240}}
                resizeMode={'cover'}
                source={{
                  uri: main && main.thumbnail,
                }}
              /> */}
            <YoutubePlayer
              webViewStyle={{
                flex: 1,
                alignSelf: 'stretch',
              }}
              videoId={main && main.videoId}
              // playList={videos.map((video) => video.videoId)}
              // playListStartIndex={musicNumber}
              autoplay={false}
              // onReady={() => setVideoLoading(false)}
              // play={true}
              height={contents.width / 1.77}
              onChangeState={(e) => {
                console.log(e);
                if (e === 'ended') {
                  null;
                  // testHandle({musicNumber});
                }
              }}
              initialPlayerParams={{
                controls: true,
              }}
              userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
              playbackRate={1}
            />
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{
                width: contents.width,
                textAlign: 'center',
                padding: 7,
                fontSize: 15,
                fontWeight: '700',
                color: styles.darkGreyColor,
              }}>
              {main && main.title}
            </Text>
          </View>
          {/* </TouchableWithoutFeedback> */}
          <View
            style={{
              marginTop: 20,
              borderBottomColor: styles.lightGreyColor,
              borderBottomWidth: 10,
              paddingBottom: 25,
            }}>
            <Text
              style={{
                color: styles.blackColor,
                fontWeight: '700',
                paddingLeft: 20,
                paddingBottom: 10,
                fontSize: 20,
              }}>
              "프로그램 영상"
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}>
              {addProgram === false ? (
                <>
                  {data &&
                    data.seeProgram &&
                    data.seeProgram.slice(0, 4) &&
                    data.seeProgram.slice(0, 4).map((program, index) => (
                      <View key={index}>
                        <ProgramView
                          program={program}
                          navigation={navigation}
                        />
                        {program && program.newVideos === true ? (
                          <View
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: -10,
                              zIndex: 1,
                            }}>
                            <View
                              style={{
                                width: 40,
                                height: 25,
                                backgroundColor: styles.newColor,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                              }}>
                              <Text
                                style={{
                                  fontWeight: '700',
                                  color: 'white',
                                  fontSize: 12,
                                }}>
                                New
                              </Text>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    ))}
                </>
              ) : (
                <>
                  {data &&
                    data.seeProgram &&
                    data.seeProgram.map((program, index) => (
                      <View key={index}>
                        <ProgramView
                          program={program}
                          navigation={navigation}
                        />
                        {program && program.newVideos === true ? (
                          <View
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: -10,
                              zIndex: 1,
                            }}>
                            <View
                              style={{
                                width: 40,
                                height: 25,
                                backgroundColor: styles.newColor,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                              }}>
                              <Text
                                style={{
                                  fontWeight: '700',
                                  color: 'white',
                                  fontSize: 12,
                                }}>
                                New
                              </Text>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    ))}
                  {data &&
                  data.seeProgram &&
                  data.seeProgram.length % 2 !== 0 ? (
                    <View style={{width: contents.width / 2.3}}></View>
                  ) : null}
                </>
              )}
            </View>
            <TouchableOpacity onPress={() => setAddProgram(!addProgram)}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 17,
                }}>
                <Text style={{fontWeight: '700', color: styles.darkGreyColor}}>
                  {addProgram === false
                    ? '프로그램 영상 더보기'
                    : addProgram === true
                    ? '닫기'
                    : null}
                </Text>
                <IoniconsIcons
                  name={
                    addProgram === false
                      ? 'chevron-down-outline'
                      : addProgram === true
                      ? 'chevron-up'
                      : null
                  }
                  size={20}
                  color={styles.darkGreyColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginTop: 30,
              marginBottom: 20,
              borderBottomColor: styles.lightGreyColor,
              borderBottomWidth: 10,
            }}>
            <Text
              style={{
                color: styles.blackColor,
                fontWeight: '700',
                paddingLeft: 20,
                fontSize: 20,
              }}>
              "최신곡을 소개합니다"
            </Text>
            <View>
              <LatestVideoView navigation={navigation} favorite={favorite} />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginTop: 30,
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: styles.blackColor,
                fontWeight: '700',
                paddingLeft: 20,
                fontSize: 20,
              }}>
              "세대 별 공감뮤직"
            </Text>
            <View>
              <GenerationView navigation={navigation} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MainView;
