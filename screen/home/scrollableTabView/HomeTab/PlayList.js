import React from 'react';
import {View, Text} from 'react-native';
import {useQuery} from 'react-apollo-hooks';
import {SEE_PLAY_LIST_BOX} from '../../../Query';
import {ScrollView} from 'react-native-gesture-handler';
import styles from '../../../../styles';
import contents from '../../../../contents';
import PlayListImageView from './playList/PlayListImageView';

const PlayList = ({data, navigation, favorite, setFavorite, loading}) => {
  const playListLength = data && data.seePlayList && data.seePlayList.length;
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, backgroundColor: styles.lightGreyColor}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          {data &&
            data.seePlayList &&
            data.seePlayList.map((playList) => (
              <View style={{marginTop: 10}} key={Math.random().toString()}>
                <PlayListImageView
                  {...playList}
                  navigation={navigation}
                  favorite={favorite}
                />
              </View>
            ))}
          {playListLength % 3 === 1 ? (
            <View
              style={{
                width: contents.width / 3.2,
              }}></View>
          ) : playListLength % 3 === 2 ? (
            <View
              style={{
                width: contents.width / 3.2,
              }}></View>
          ) : null}
          {playListLength % 3 === 1 ? (
            <View
              style={{
                width: contents.width / 3.2,
              }}></View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default PlayList;
