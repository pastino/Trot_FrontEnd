import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AlbumImageView from '../../../../components/AlbumImageView';
import styles from '../../../../styles';
import contents from '../../../../contents';

const AlbumMusic = ({navigation, favorite, loading, data}) => {
  const artistLength = data && data.seeSinger && data.seeSinger.length;

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
            data.seeSinger &&
            data.seeSinger.map((singer) => (
              <View style={{marginTop: 10}} key={Math.random().toString()}>
                <AlbumImageView
                  {...singer}
                  navigation={navigation}
                  favorite={favorite}
                />
              </View>
            ))}
          {artistLength % 3 === 1 ? (
            <View
              style={{
                width: contents.width / 3.2,
              }}></View>
          ) : artistLength % 3 === 2 ? (
            <View
              style={{
                width: contents.width / 3.2,
              }}></View>
          ) : null}
          {artistLength % 3 === 1 ? (
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

export default AlbumMusic;
