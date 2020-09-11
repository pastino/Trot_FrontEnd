import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {useQuery} from 'react-apollo-hooks';
import {SEE_PLAY_LIST_SONG} from '../../../../Query';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import TopSong from '../TopSong';
import contents from '../../../../../contents';
import styles from '../../../../../styles';
import IoniconsIcons from '../../../../../components/IoniconsIcons';
import firebase from 'react-native-firebase';

const SeePlayListView = ({navigation, navigation: {goBack}}) => {
  const id = navigation.getParam('id');
  const playListName = navigation.getParam('playListName');
  const videoLength = navigation.getParam('videoLength');
  const navFavorite = navigation.getParam('favorite');
  const [favorite, setFavorite] = useState(navFavorite);
  const {data, loading} = useQuery(SEE_PLAY_LIST_SONG, {
    variables: {id},
  });
  const videos = data && data.seePlayListSong && data.seePlayListSong.videos;

  const backAction = () => {
    navigation.navigate('Home', {favorite});
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const unitId = __DEV__
    ? 'ca-app-pub-3940256099942544/6300978111'
    : 'ca-app-pub-5456093771866183/5562632579';
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

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: contents.width,
          height: 70,
          backgroundColor: 'white',
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback
          style={{flexDirection: 'row', paddingLeft: 20, alignItems: 'center'}}
          onPress={() => navigation.navigate('Home', {favorite})}>
          <IoniconsIcons name={'arrow-back'} size={30} />
          <Text style={{fontSize: 15, fontWeight: '700', marginLeft: 20}}>
            {playListName} ({videoLength})
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <TopSong
        navigation={navigation}
        favorite={favorite}
        setFavorite={setFavorite}
        data={videos}
        loading={loading}
        division={'playList'}
      />
    </View>
  );
};

export default SeePlayListView;
