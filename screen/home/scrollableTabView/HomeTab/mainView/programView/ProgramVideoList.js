import React, {Fragment} from 'react';
import {View, Text, Image} from 'react-native';
import {SEE_PROGRAM_VIDEO} from '../../../../../Query';
import {useQuery} from 'react-apollo-hooks';
import LoadingModal from '../../../../../../components/LoadingModal';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import contents from '../../../../../../contents';
import styles from '../../../../../../styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import BigSizeVideo from './BigSizeVideo';
import SmallSizeVideo from './SmallSizeVideo';
import IoniconsIcons from '../../../../../../components/IoniconsIcons';

const ProgramVideoList = ({navigation, navigation: {goBack}}) => {
  const program = navigation.getParam('program');

  const {data, loading, refetch, fetchMore} = useQuery(SEE_PROGRAM_VIDEO, {
    variables: {
      program,
      pageNumber: 0,
      items: 50,
    },
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <View
        style={{
          width: contents.width,
          height: 70,
          borderBottomWidth: 1,
          borderBottomColor: styles.lightGreyColor,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <TouchableWithoutFeedback
          containerStyle={{position: 'absolute', left: 10}}
          onPress={() => goBack()}>
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IoniconsIcons
              name={'arrow-back'}
              size={30}
              color={styles.darkGreyColor}
            />
            <Text
              style={{
                fontWeight: '700',
                marginLeft: 7,
                color: styles.darkGreyColor,
              }}>
              뒤로가기
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={{fontWeight: '700', fontSize: 16}}>
          {program.split('(')[0]}
        </Text>
      </View>
      <ScrollableTabView initialPage={0} style={{backgroundColor: 'white'}}>
        <BigSizeVideo
          tabLabel="선택보기"
          data={data}
          program={program}
          loading={loading}
          refetch={refetch}
          fetchMore={fetchMore}
        />
        <SmallSizeVideo
          navigation={navigation}
          tabLabel="플레이리스트"
          data={data}
          loading={loading}
          refetch={refetch}
          fetchMore={fetchMore}
          program={program}
        />
      </ScrollableTabView>
      <LoadingModal
        isLoading={loading}
        loadingText={'데이터를 불러오는 중입니다'}
      />
    </>
  );
};

export default ProgramVideoList;
