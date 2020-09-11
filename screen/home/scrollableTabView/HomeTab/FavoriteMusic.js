import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {deleteFavorite} from '../../../../databases/AllSchemas';
import styles from '../../../../styles';
import contents from '../../../../contents';
import IoniconsIcons from '../../../../components/IoniconsIcons';

const FavoriteMusic = ({navigation, favorite, setFavorite, loading}) => {
  const [palyLists, setPlayLists] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const deleteFavoriteHadle = ({id, video}) => {
    setFavorite(favorite.filter((video) => video.id !== id));
    deleteFavorite(id);
    if (palyLists.map((obj) => obj.video.id).includes(id)) {
      setPlayLists(palyLists.filter((obj) => obj.video.id !== video.id));
    }
  };

  const selectMusicHandle = ({video, index}) => {
    if (palyLists.map((obj) => obj.video.videoId).includes(video.videoId)) {
      setPlayLists(
        palyLists.filter((obj) => obj.video.videoId !== video.videoId),
      );
    } else {
      setPlayLists(palyLists.concat({video, index}));
    }
  };

  const [favoriteId, setFavoriteId] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={'black'} size={30} />
    </View>
  ) : (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, paddingBottom: 60}}>
          {favorite.length === 0 ? (
            <View
              style={{
                width: contents.width,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  paddingTop: 20,
                  color: styles.darkGreyColor,
                }}>
                즐겨찾기한 음악이 없습니다.
              </Text>
            </View>
          ) : (
            favorite.map((video, index) => (
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
                    onPress={() =>
                      selectMusicHandle({
                        video,
                        index,
                      })
                    }>
                    <View
                      style={{
                        width: contents.width / 1.2,
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
                          width: contents.width / 1.9,
                          padding: 10,
                        }}>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{
                            fontSize: 15,
                            width: contents.width / 1.6 / 1.2,
                            fontWeight: '700',
                          }}>
                          {video.title}
                        </Text>
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
                      <TouchableOpacity
                        style={{
                          width: contents.width - contents.width / 1.13,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          deleteFavoriteHadle({
                            id: video.id,
                            video,
                          })
                        }>
                        <IoniconsIcons
                          name={'md-star-sharp'}
                          size={30}
                          color={styles.Yellow}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          width: contents.width - contents.width / 1.13,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          addFavoriteHandle({
                            id: video.id,
                          })
                        }>
                        <IoniconsIcons
                          name={'md-star-outline'}
                          size={30}
                          color={'black'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))
          )}
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
        <TouchableOpacity
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
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MusicPlayer', {
              videos: favorite,
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
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FavoriteMusic;
