import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import contents from '../../../../contents';
import styles from '../../../../styles';
import IoniconsIcons from '../../../../components/IoniconsIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  insertNewFavorte,
  queryAllFavorite,
  deleteFavorite,
} from '../../../../databases/AllSchemas';
import {useQuery} from 'react-apollo-hooks';
import {SEARCH_VIDEO} from '../../../Query';
import TopSong from './TopSong';
import firebase from 'react-native-firebase';

const SearchDataView = ({navigation, navigation: {goBack}}) => {
  const value = navigation.getParam('value');

  const [favorite, setFavorite] = useState([]);

  const {
    data: searchData,
    loading: searchLoading,
    refetch: searchRefetch,
    fetchMore: searchFetchMore,
  } = useQuery(SEARCH_VIDEO, {
    variables: {
      value,
      pageNumber: 0,
      items: 50,
    },
    fetchPolicy: 'network-only',
  });

  const reloadData = () => {
    queryAllFavorite()
      .then((favorite) => {
        setFavorite(favorite);
      })
      .catch((error) => {
        setFavorite([]);
        console.log(error);
      });
  };

  useEffect(() => {
    reloadData();
    let fullUnitId;
    if (__DEV__) {
      fullUnitId = 'ca-app-pub-3940256099942544/1033173712';
    } else {
      fullUnitId = 'ca-app-pub-5456093771866183/8229615366';
    }
    const fullAdvert = firebase.admob().interstitial(fullUnitId);
    const fullAdRequest = firebase.admob.AdRequest;
    const fullRequest = new fullAdRequest();
    fullAdvert.loadAd(fullRequest.build());
    fullAdvert.on('onAdLoaded', () => {
      console.log('Advert ready to show.');
      fullAdvert.show();
    });
  }, []);

  return (
    <>
      <View
        style={{
          width: contents.width,
          height: 60,
          backgroundColor: styles.MainColor,
        }}>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <View
            style={{
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 15,
            }}>
            <IoniconsIcons
              name={'arrow-back-sharp'}
              size={40}
              color={'white'}
            />
            <Text style={{fontWeight: '700', color: 'white', paddingLeft: 15}}>
              뒤로가기
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TopSong
          data={searchData && searchData.searchVideo}
          loading={searchLoading}
          navigation={navigation}
          favorite={favorite}
          setFavorite={setFavorite}
          fetchMore={searchFetchMore}
          division={'search'}
        />
      </View>
      {/* {searchLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'black'} size={30} />
        </View>
      ) : (

        <TopSong
        tabLabel="TOP 100"
        data={top && top.seeVideo}
        loading={topLoading}
        navigation={navigation}
        favorite={favorite}
        setFavorite={setFavorite}
        fetchMore={topFetchMore}
        division={'top'}
      />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, paddingBottom: 60, backgroundColor: 'white'}}>
            {searchData &&
            searchData.searchVideo &&
            searchData.searchVideo.length === 0 &&
            !searchLoading ? (
              <View
                style={{
                  width: contents.width,
                  alignItems: 'center',
                  paddingTop: 20,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 15,
                    color: styles.darkGreyColor,
                  }}>
                  검색어에 해당되는 음악이 없습니다
                </Text>
              </View>
            ) : (
              searchData &&
              searchData.searchVideo &&
              searchData.searchVideo.map((video, index) => (
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
                            width: contents.width / 1.8,

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
                      {favoriteIdArray.includes(video.videoId) ? (
                        <TouchableOpacity
                          style={{
                            width: contents.width - contents.width / 1.13,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() =>
                            deleteFavoriteHadle({
                              videoId: video.videoId,
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
                              videoId: video.videoId,
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
      )}
      <View
        style={{
          bottom: 0,
          width: contents.width,
          height: 50,
          backgroundColor: styles.MainColor,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MusicPlayer', {
              videos: palyLists
                .sort((a, b) => a.index - b.index)
                .map((video) => video.video),
            })
          }>
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
        </TouchableOpacity>
      </View> */}
    </>
  );
};

export default SearchDataView;
