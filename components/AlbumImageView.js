import React from 'react';
import {View, Text, Image} from 'react-native';
import contents from '../contents';
import styles from '../styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const AlbumImageView = ({singerName, imageUrl, navigation, favorite}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('AlbumMusicView', {artist: singerName, favorite});
      }}>
      <View
        style={{
          width: contents.width / 3.2,
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          borderRadius: 7,
          borderWidth: 1.5,
          borderColor: '#ddd',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: 'white',
        }}>
        <FastImage
          style={{
            width: contents.width / 4,
            height: contents.width / 4,
            borderRadius: 60,
            paddingTop: 5,
            paddingBottom: 5,
            borderColor: styles.lightGreyColor,
            borderWidth: 5,
          }}
          source={{uri: imageUrl}}
        />
        <Text style={{textAlign: 'center', paddingTop: 5, fontWeight: '700'}}>
          {singerName}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AlbumImageView;
