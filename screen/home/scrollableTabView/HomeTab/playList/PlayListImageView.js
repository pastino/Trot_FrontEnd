import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import contents from '../../../../../contents';
import styles from '../../../../../styles';

const PlayListImageView = ({
  id,
  playListName,
  imageUrl,
  navigation,
  favorite,
  videoLength,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('SeePlayListView', {
          id,
          favorite,
          playListName,
          videoLength,
        });
      }}>
      <FastImage
        style={{
          width: contents.width / 2.2,
          height: contents.width / 2.5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        source={{uri: imageUrl}}
      />
      <View
        style={{
          width: contents.width / 2.2,
          height: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          borderRightColor: styles.lightGreyColor,
          borderLeftColor: styles.lightGreyColor,
          borderBottomColor: styles.lightGreyColor,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderBottomWidth: 1,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 2,
          borderBottomWidth: 0,
          backgroundColor: 'white',
          marginBottom: 7,
        }}>
        <View>
          <Text
            style={{
              fontWeight: '700',
              textAlign: 'center',
              marginTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            {playListName}
          </Text>
          <Text
            style={{
              color: styles.darkGreyColor,
              fontSize: 13,
              textAlign: 'center',
              padding: 10,
            }}>
            {videoLength}곡
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PlayListImageView;
