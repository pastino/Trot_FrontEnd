import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import styles from '../../styles';
import contents from '../../contents';
import {useQuery, useMutation} from 'react-apollo-hooks';
import IoniconsIcons from '../../components/IoniconsIcons';
import TopSong from './scrollableTabView/HomeTab/TopSong';
import AlbumMusic from './scrollableTabView/HomeTab/AlbumMusic';
import FavoriteMusic from './scrollableTabView/HomeTab/FavoriteMusic';
import {queryAllFavorite} from '../../databases/AllSchemas';
import SearchBar from './scrollableTabView/HomeTab/SearchBar';
import firebase from 'react-native-firebase';
import {
  SEE_VIDEO,
  FAVORITE_VIDEO,
  MAIN_VIEW_VIDEO,
  SEE_TOP_SONG,
  SEE_PLAY_LIST_BOX,
  SEE_SINGER_BOX,
} from '../Query';
import axios from 'axios';
import MainView from './scrollableTabView/HomeTab/MainView';
import Modal from 'react-native-modal';
import PlayList from './scrollableTabView/HomeTab/PlayList';
import FaceBookBar from './scrollableTabView/FaceBookBar';

const Home = ({navigation}) => {
  const navFavorite = navigation.getParam('favorite');

  const [favorite, setFavorite] = useState(
    navFavorite !== undefined ? navFavorite : [],
  );

  useEffect(() => {
    if (navFavorite !== undefined) {
      setFavorite(navFavorite);
    }
  }, [navFavorite]);

  const {data: mainViewVideo, loading: mainViewVideoLoading} = useQuery(
    MAIN_VIEW_VIDEO,
    {
      fetchPolicy: 'network-only',
    },
  );

  const main =
    mainViewVideo !== undefined
      ? mainViewVideo && mainViewVideo.mainViewVideo[0]
      : [];

  const {
    data: top,
    loading: topLoading,
    refetch: topRefetch,
    fetchMore: topFetchMore,
  } = useQuery(SEE_TOP_SONG, {
    fetchPolicy: 'network-only',
  });

  const {
    data: masterpiece,
    loading: masterLoading,
    refetch: masterRefetch,
    fetchMore: masterFetchMore,
  } = useQuery(SEE_VIDEO, {
    variables: {
      division: 'masterpiece',
      pageNumber: 0,
      items: 50,
    },
    fetchPolicy: 'network-only',
  });

  const {data: playListBoxData, loading: playListBoxLoading} = useQuery(
    SEE_PLAY_LIST_BOX,
    {
      variables: {
        division: 'prod',
      },
      fetchPolicy: 'network-only',
    },
  );

  const {data: singerBoxData, loading: singerBoxLoading} = useQuery(
    SEE_SINGER_BOX,
    {
      variables: {
        division: 'prod',
      },
      fetchPolicy: 'network-only',
    },
  );

  const [shouldFetch, setShouldFetch] = useState(false);
  const [favoriteId, setFavoriteId] = useState([]);

  const {
    data: favoriteData,
    loading: favoriteLoading,
    refetch: favoriteRefetch,
    fetchMore: favoriteFetchMore,
  } = useQuery(FAVORITE_VIDEO, {
    variables: {
      videoId: favoriteId.map((video) => video.videoId),
    },
    notifyOnNetworkStatusChange: true,
    skip: !shouldFetch,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (shouldFetch === true) {
      setFavorite(favoriteData && favoriteData.favoriteVideo);
    }
    setShouldFetch(false);
  }, [favoriteData]);

  const loadFavoriteData = async () => {
    queryAllFavorite()
      .then((favorite) => {
        setFavoriteId(favorite);
      })
      .then(setShouldFetch(true))
      .catch((error) => {
        setFavorite([]);
        console.log(error);
      });
  };

  const unitId = 'ca-app-pub-5456093771866183/5562632579';
  const Banner = firebase.admob.Banner;
  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();

  useEffect(() => {
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

  useEffect(() => {
    loadFavoriteData();
  }, []);

  const [scrollableLock, setScrollableLock] = useState(false);

  return (
    <>
      <View
        style={{
          width: contents.width,
          height: 70,
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: styles.MainColor,
          flexDirection: 'row',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View style={{}}>
            <IoniconsIcons name={'menu'} size={32} color={'white'} />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: '700', color: 'white', fontSize: 17}}>
            트로트 판
          </Text>
        </View>
        <SearchBar navigation={navigation} />
      </View>
      <ScrollableTabView
        initialPage={0}
        style={{backgroundColor: 'white'}}
        locked={scrollableLock}
        renderTabBar={() => <FaceBookBar />}>
        <MainView
          tabLabel="영상"
          main={main}
          mainViewVideoLoading={mainViewVideoLoading}
          navigation={navigation}
          setScrollableLock={setScrollableLock}
          favorite={favorite}
          setFavorite={setFavorite}
        />
        <TopSong
          tabLabel="TOP"
          data={top && top.seeTopSong}
          loading={topLoading}
          navigation={navigation}
          favorite={favorite}
          setFavorite={setFavorite}
          fetchMore={topFetchMore}
          division={'top'}
        />
        <TopSong
          tabLabel="명곡"
          data={masterpiece && masterpiece.seeVideo}
          loading={masterLoading}
          navigation={navigation}
          favorite={favorite}
          setFavorite={setFavorite}
          fetchMore={masterFetchMore}
          division={'masterpiece'}
        />
        <ScrollView tabLabel="DJ" contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <PlayList
              navigation={navigation}
              data={playListBoxData}
              loading={playListBoxLoading}
              favorite={favorite}
              setFavorite={setFavorite}
            />
          </View>
        </ScrollView>
        <ScrollView tabLabel="가수" contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <AlbumMusic
              navigation={navigation}
              data={singerBoxData}
              loading={singerBoxLoading}
              favorite={favorite}
              setFavorite={setFavorite}
            />
          </View>
        </ScrollView>
        <FavoriteMusic
          tabLabel="즐겨찾기"
          navigation={navigation}
          favorite={favorite}
          loading={favoriteLoading}
          setFavorite={setFavorite}
          videos={favoriteData && favoriteData.favoriteVideo}
        />
      </ScrollableTabView>
      {/* <View
        style={{
          width: contents.width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Banner
          unitId={unitId}
          size={'FLUID'}
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
        />
      </View> */}
    </>
  );
};

export default Home;
