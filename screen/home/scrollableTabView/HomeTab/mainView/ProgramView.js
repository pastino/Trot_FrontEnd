import React from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import contents from '../../../../../contents';
import styles from '../../../../../styles';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const ProgramView = ({program, navigation}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('ProgramVideoList', {
          program: `${program.programName}(v)`,
        })
      }
      style={{}}>
      <View style={{paddingBottom: 5}}>
        <FastImage
          style={{
            width: contents.width / 2.3,
            height: contents.width / 2.5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginTop: 10,
          }}
          resizeMode={'cover'}
          source={{
            uri: program.imageUrl,
          }}
        />

        <View style={{}}>
          <View
            style={{
              width: contents.width / 2.3,
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
            }}>
            <View>
              <Text
                style={{fontWeight: '700', textAlign: 'center', marginTop: 10}}>
                {program.programName}
              </Text>
              <Text
                style={{
                  color: styles.darkGreyColor,
                  fontSize: 13,

                  textAlign: 'center',
                  padding: 10,
                }}>
                영상 모음집
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProgramView;
