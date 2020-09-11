import React, {useState} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {SEE_LATEST_VIDEO} from '../../../../../Query';
import {useQuery} from 'react-apollo-hooks';
import TopSong from '../../TopSong';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import IoniconsIcons from '../../../../../../components/IoniconsIcons';
import styles from '../../../../../../styles';
import contents from '../../../../../../contents';
import LoadingModal from '../../../../../../components/LoadingModal';

const LatestAllVideo = ({navigation, navigation: {goBack}}) => {
  const navFavorite = navigation.getParam('favorite');
  const [favorite, setFavorite] = useState(navFavorite);

  const {data, loading, refetch, fetchMore} = useQuery(SEE_LATEST_VIDEO, {
    variables: {
      division: 'all',
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
          height: 60,
          backgroundColor: styles.MainColor,
        }}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Home', {favorite})}>
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
      {loading ? (
        <LoadingModal
          isLoading={loading}
          loadingText={'데이터를 불러오는 중입니다'}
        />
      ) : (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <TopSong
            navigation={navigation}
            favorite={favorite}
            setFavorite={setFavorite}
            data={data && data.seeLatestVideo}
            loading={loading}
            fetchMore={fetchMore}
            division={'latest'}
            //   program= {}
          />
        </View>
      )}
    </>
  );
};

export default LatestAllVideo;
