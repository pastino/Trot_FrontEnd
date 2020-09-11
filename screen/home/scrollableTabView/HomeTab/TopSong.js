import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import styles from '../../../../styles';
import contents from '../../../../contents';
import IoniconsIcons from '../../../../components/IoniconsIcons';
import {
  insertNewFavorte,
  queryAllFavorite,
  deleteFavorite,
} from '../../../../databases/AllSchemas';
import LoadingModal from '../../../../components/LoadingModal';
import moment from 'moment';

const TopSong = ({
  navigation,
  favorite,
  setFavorite,
  data,
  loading,
  fetchMore,
  division,
  program,
}) => {
  const [palyLists, setPlayLists] = useState([]);
  const [noMoreFetch, setNoMoreFetch] = useState(false);
  const [fetchmoreLoading, setFetchmoreLoading] = useState(false);

  const selectMusicHandle = ({video, index}) => {
    if (palyLists.map((obj) => obj.video.videoId).includes(video.videoId)) {
      setPlayLists(
        palyLists.filter((obj) => obj.video.videoId !== video.videoId),
      );
    } else {
      setPlayLists(palyLists.concat({video, index}));
    }
  };

  const addFavoriteHandle = ({video}) => {
    setFavorite(favorite.concat(video));
    const newFavorite = {
      id: Math.random().toString(),
      videoId: video.id,
      creationDate: new Date(),
    };
    insertNewFavorte(newFavorite);
  };

  const deleteFavoriteHadle = ({video}) => {
    setFavorite(favorite.filter((item) => item.id !== video.id));
    deleteFavorite(video.id);
  };

  return loading ? (
    <LoadingModal
      isLoading={loading}
      loadingText={'데이터를 불러오는 중입니다.'}
    />
  ) : (
    <>
      <ScrollView
        onScroll={async (e) => {
          if (division === 'top' || division === 'playList') {
            null;
          } else {
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
                if (division === 'artist') {
                  await fetchMore({
                    variables: {
                      division,
                      pageNumber: data && data.length,
                      items: 50,
                    },
                    updateQuery: (prev, {fetchMoreResult}) => {
                      if (fetchMoreResult.artistVideo.length === 0) {
                        setNoMoreFetch(true);
                      }
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        artistVideo: [
                          ...prev.artistVideo,
                          ...fetchMoreResult.artistVideo,
                        ],
                      });
                    },
                  });
                } else if (division === 'search') {
                  await fetchMore({
                    variables: {
                      division,
                      pageNumber: data && data.length,
                      items: 50,
                    },
                    updateQuery: (prev, {fetchMoreResult}) => {
                      if (fetchMoreResult.searchVideo.length === 0) {
                        setNoMoreFetch(true);
                      }
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        searchVideo: [
                          ...prev.searchVideo,
                          ...fetchMoreResult.searchVideo,
                        ],
                      });
                    },
                  });
                } else if (division === 'program') {
                  await fetchMore({
                    variables: {
                      program,
                      pageNumber: data && data.length,
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
                } else if (division === 'latest') {
                  await fetchMore({
                    variables: {
                      program,
                      pageNumber: data && data.length,
                      items: 50,
                    },
                    updateQuery: (prev, {fetchMoreResult}) => {
                      if (fetchMoreResult.seeLatestVideo.length === 0) {
                        setNoMoreFetch(true);
                      }
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        seeLatestVideo: [
                          ...prev.seeLatestVideo,
                          ...fetchMoreResult.seeLatestVideo,
                        ],
                      });
                    },
                  });
                } else {
                  await fetchMore({
                    variables: {
                      division,
                      pageNumber: data && data.length,
                      items: 50,
                    },
                    updateQuery: (prev, {fetchMoreResult}) => {
                      if (fetchMoreResult.seeVideo.length === 0) {
                        setNoMoreFetch(true);
                      }
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        seeVideo: [
                          ...prev.seeVideo,
                          ...fetchMoreResult.seeVideo,
                        ],
                      });
                    },
                  });
                }
                setFetchmoreLoading(false);
              }
            }
          }
        }}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          {data.map((video, index) => (
            <View key={index}>
              <View
                key={video.videoId}
                style={{
                  flexDirection: 'row',
                  width: contents.width,
                  height: 70,
                  borderBottomColor: styles.lightGreyColor,
                  borderBottomWidth: 1,
                  backgroundColor: palyLists
                    .map((obj) => obj.video.videoId)
                    .includes(video.videoId)
                    ? styles.lightGreyColor
                    : null,
                }}>
                <TouchableWithoutFeedback
                  style={{flexDirection: 'row'}}
                  onPress={() =>
                    selectMusicHandle({
                      video,
                      index,
                    })
                  }>
                  {division === 'top' ? (
                    <View
                      style={{
                        width: contents.width / 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: index === 99 ? 11 : null,
                        }}>
                        {index + 1}
                      </Text>
                    </View>
                  ) : null}
                  {division === 'latest' ? (
                    <View
                      style={{
                        width: contents.width / 10,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 10,
                      }}>
                      <Text style={{color: styles.darkGreyColor}}>
                        {moment(video.releaseDate).format('MM')}.
                      </Text>

                      <Text
                        style={{color: styles.darkGreyColor, paddingRight: 5}}>
                        {moment(video.releaseDate).format('DD')}
                      </Text>
                    </View>
                  ) : null}
                  <View
                    style={{
                      width:
                        division === 'top' || division === 'latest'
                          ? contents.width / 1.35
                          : contents.width / 1.2,
                      flexDirection: 'row',
                      padding: 10,
                    }}>
                    <Image
                      resizeMode={'cover'}
                      source={{
                        uri: video.thumbnail,
                      }}
                      style={{width: 50, height: 50, borderRadius: 20}}
                    />
                    <View
                      style={{
                        width:
                          division === 'top' || division === 'latest'
                            ? contents.width / 2.3
                            : contents.width / 1.92,
                        paddingLeft: 10,
                        justifyContent: 'center',
                        alignItems: division === 'program' ? 'center' : null,
                      }}>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={division === 'program' ? 2 : 1}
                        style={{
                          fontSize: division === 'program' ? 13 : 15,
                          width:
                            division === 'top' || division === 'latest'
                              ? contents.width / 2 / 1.2
                              : contents.width / 1.6 / 1.2,
                          fontWeight: '700',
                        }}>
                        {video.title}
                      </Text>
                      {division === 'program' ? null : (
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{
                            fontSize: 12,
                            marginTop: 5,
                            color: styles.darkGreyColor,
                          }}>
                          {video.singer}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: styles.darkGreyColor}}>
                        {video.duration}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <View
                  style={{
                    width: contents.width - contents.width / 1.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftColor: styles.lightGreyColor,
                    borderLeftWidth: 1,
                  }}>
                  {favorite.map((video) => video.id).includes(video.id) ? (
                    <TouchableWithoutFeedback
                      style={{
                        width: contents.width - contents.width / 1.13,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        deleteFavoriteHadle({
                          video,
                        })
                      }>
                      <IoniconsIcons
                        name={'md-star-sharp'}
                        size={30}
                        color={styles.Yellow}
                      />
                    </TouchableWithoutFeedback>
                  ) : (
                    <TouchableWithoutFeedback
                      style={{
                        width: contents.width - contents.width / 1.13,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        addFavoriteHandle({
                          video,
                        })
                      }>
                      <IoniconsIcons
                        name={'md-star-outline'}
                        size={30}
                        color={'black'}
                      />
                    </TouchableWithoutFeedback>
                  )}
                </View>
              </View>
            </View>
          ))}
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
      <View
        style={{
          bottom: 0,
          width: contents.width,
          height: 50,
          backgroundColor: styles.MainColor,
          flexDirection: 'row',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (palyLists.length === 0) {
              ToastAndroid.show('선택한 곡이 없습니다', ToastAndroid.SHORT);
            } else {
              navigation.navigate('MusicPlayer', {
                videos: palyLists
                  .sort((a, b) => a.index - b.index)
                  .map((video) => video.video),
              });
            }
          }}>
          <View
            style={{
              width: contents.width / 2,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRightColor: 'white',
              borderRightWidth: 1,
            }}>
            <Text style={{fontWeight: '700', fontSize: 20, color: 'white'}}>
              선택재생
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('MusicPlayer', {
              videos: data,
            })
          }>
          <View
            style={{
              width: contents.width / 2,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '700', fontSize: 20, color: 'white'}}>
              전체재생
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default TopSong;
