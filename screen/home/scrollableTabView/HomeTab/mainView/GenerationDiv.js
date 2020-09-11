import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../../../../styles';
import contents from '../../../../../contents';

const GenerationDiv = ({generation, gender, index, swiperIndex}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        marginBottom: 20,
      }}>
      <View
        style={{
          width: contents.width / 5,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          backgroundColor:
            swiperIndex === index ? styles.MainColor : styles.darkGreyColor,
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 12,
            color: 'white',
          }}>
          {generation}
        </Text>
      </View>
      <View
        style={{
          width: contents.width / 5,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopColor: styles.lightGreyColor,
          borderTopWidth: 0.5,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor:
            swiperIndex === index ? styles.MainColor : styles.darkGreyColor,
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 12,
            color: 'white',
          }}>
          {gender}
        </Text>
      </View>
    </View>
  );
};

export default GenerationDiv;
