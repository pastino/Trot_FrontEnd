import React, {Fragment, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import contents from '../../../../../../contents';
import styles from '../../../../../../styles';
import YoutubePlayer from 'react-native-youtube-iframe';

const BigSizeVideo = ({data, program, loading, refetch, fetchMore}) => {
  const [noMoreFetch, setNoMoreFetch] = useState(false);
  const [fetchmoreLoading, setFetchmoreLoading] = useState(false);

  const [playVideo, setPlayVideo] = useState(null);

  return (
    <>
      {playVideo !== null ? (
        <View
          style={{
            borderBottomColor: styles.lightGreyColor,
            borderBottomWidth: 3,
          }}>
          <YoutubePlayer
            webViewStyle={{
              flex: 1,
              alignSelf: 'stretch',
            }}
            height={contents.width / 1.77}
            videoId={`${playVideo.videoId}?autoplay=1`}
            autoplay={true}
            playList={
              data &&
              data.seeProgramVideo &&
              data.seeProgramVideo.map((video) => video.videoId)
            }
            playListStartIndex={
              data &&
              data.seeProgramVideo &&
              data.seeProgramVideo
                .map((video) => video.videoId)
                .findIndex((obj) => obj === playVideo.videoId)
            }
            play={true}
            onChangeState={(e) => {
              if (e === 'ended') {
                const index =
                  data &&
                  data.seeProgramVideo &&
                  data.seeProgramVideo.map((video) => video.videoId) &&
                  data.seeProgramVideo
                    .map((video) => video.videoId)
                    .findIndex((obj) => obj === playVideo.videoId);
                console.log(index);
                setPlayVideo(
                  data &&
                    data.seeProgramVideo &&
                    data.seeProgramVideo[index + 1],
                );
              }
            }}
            initialPlayerParams={{
              controls: true,
            }}
            userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
            playbackRate={1}
          />
          <View
            style={{
              width: contents.width,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 7,
            }}>
            <Text
              style={{
                fontWeight: '700',
                color: styles.blackColor,
                textAlign: 'center',
              }}>
              {playVideo.title}
            </Text>
          </View>
        </View>
      ) : null}
      <ScrollView
        onScroll={async (e) => {
          if (noMoreFetch) {
            null;
          } else {
            let paddingToBottom = 1;
            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
            if (
              e.nativeEvent.contentOffset.y + paddingToBottom >=
              e.nativeEvent.contentSize.height
            ) {
              setFetchmoreLoading(true);
              await fetchMore({
                variables: {
                  program,
                  pageNumber:
                    data && data.seeProgramVideo && data.seeProgramVideo.length,
                  items: 50,
                },
                updateQuery: (prev, {fetchMoreResult}) => {
                  if (fetchMoreResult.seeProgramVideo.length === 0) {
                    setNoMoreFetch(true);
                  }
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    seeProgramVideo: [
                      ...prev.seeProgramVideo,
                      ...fetchMoreResult.seeProgramVideo,
                    ],
                  });
                },
              });
              setFetchmoreLoading(false);
            }
          }
        }}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {data &&
              data.seeProgramVideo &&
              data.seeProgramVideo.map((video) => (
                <Fragment key={video.id}>
                  <TouchableWithoutFeedback
                    style={{}}
                    onPress={() => setPlayVideo(video)}
                    style={{}}>
                    {video.newVideo === true ? (
                      <View
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 0,
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
                    <View
                      style={{
                        paddingBottom: 5,
                      }}>
                      <View>
                        <Image
                          style={{
                            width: contents.width / 2.1,
                            height: contents.width / 3.3,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            marginTop: 10,
                          }}
                          resizeMode={'cover'}
                          source={{
                            uri: video.thumbnail,
                          }}
                        />
                        <View
                          style={{
                            width: 40,
                            height: 30,
                            backgroundColor: styles.darkGreyColor,
                            position: 'absolute',
                            bottom: -10,
                            right: 0,
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              color: 'white',
                              fontSize: 13,
                              textAlign: 'center',
                            }}>
                            {video.duration}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <View
                          style={{
                            width: contents.width / 2.1,
                            height: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRightColor: styles.lightGreyColor,
                            borderLeftColor: styles.lightGreyColor,
                            borderBottomColor: styles.lightGreyColor,
                            borderRightWidth: 1,
                            borderLeftWidth: 1,
                            borderBottomWidth: 1,
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 2,
                            borderBottomWidth: 0,
                            backgroundColor:
                              playVideo !== null
                                ? video.videoId === playVideo.videoId
                                  ? styles.darkGreyColor
                                  : 'white'
                                : 'white',
                          }}>
                          <View>
                            <Text
                              numberOfLines={3}
                              ellipsizeMode="tail"
                              style={{
                                textAlign: 'center',
                                padding: 10,
                                fontWeight: '700',
                                color:
                                  playVideo !== null
                                    ? video.videoId === playVideo.videoId
                                      ? 'black'
                                      : styles.darkGreyColor
                                    : styles.darkGreyColor,
                              }}>
                              {video.title}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Fragment>
              ))}
            {data &&
            data.seeProgramVideo &&
            data.seeProgramVideo.length % 2 !== 0 ? (
              <View style={{width: contents.width / 2.1}}></View>
            ) : null}
          </View>
          {fetchmoreLoading ? (
            <View
              style={{
                width: contents.width,
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator style={70} color={'black'} />
            </View>
          ) : !fetchmoreLoading && noMoreFetch ? (
            <View
              style={{
                width: contents.width,
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '700', color: styles.darkGreyColor}}>
                더이상 음악이 없습니다.
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default BigSizeVideo;
