import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import contents from '../../../../contents';
import styles from '../../../../styles';
import IoniconsIcons from '../../../../components/IoniconsIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {queryAllFavorite} from '../../../../databases/AllSchemas';
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
    </>
  );
};

export default SearchDataView;
