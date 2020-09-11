import React, {useState} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import styles from '../../../../../styles';
import contents from '../../../../../contents';
import IoniconsIcons from '../../../../../components/IoniconsIcons';
import {useQuery} from 'react-apollo-hooks';
import {ARTIST_VIDEO} from '../../../../Query';
import TopSong from '../TopSong';
import LoadingModal from '../../../../../components/LoadingModal';

const AlbumMusicView = ({navigation: {goBack}, navigation}) => {
  const navFavorite = navigation.getParam('favorite');
  const [favorite, setFavorite] = useState(navFavorite);
  const artist = navigation.getParam('artist');

  const {
    data: artistData,
    loading: artistLoading,
    refetch: artistRefetch,
    fetchMore: artistFetchMore,
  } = useQuery(ARTIST_VIDEO, {
    variables: {
      artist,
      pageNumber: 0,
      items: 50,
    },
    fetchPolicy: 'network-only',
  });

  const backAction = () => {
    navigation.navigate('Home', {favorite});
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return (
    <>
      <View
        style={{
          width: contents.width,
          height: 70,
          justifyContent: 'center',
          backgroundColor: 'white',
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
        }}>
        <TouchableWithoutFeedback
          style={{flexDirection: 'row', paddingLeft: 20}}
          onPress={() => navigation.navigate('Home', {favorite})}>
          <IoniconsIcons name={'arrow-back'} size={30} />
          <Text style={{fontSize: 20, fontWeight: '700', marginLeft: 20}}>
            {artist}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {artistLoading ? (
          <LoadingModal
            isLoading={artistLoading}
            loadingText={'데이터를 불러오는 중입니다.'}
          />
        ) : (
          <TopSong
            data={artistData && artistData.artistVideo}
            loading={artistLoading}
            navigation={navigation}
            favorite={favorite}
            setFavorite={setFavorite}
            fetchMore={artistFetchMore}
            division={'artist'}
          />
        )}
      </View>
    </>
  );
};

export default AlbumMusicView;
