import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  BackHandler,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import contents from '../contents';
import styles from '../styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DrawerKakao from './kakaoLink/DrawerKakao';
import IoniconsIcons from './IoniconsIcons';

const CustomSidebarMenu = ({navigation}) => {
  return (
    <View style={{width: contents.width / 1.5, flex: 1}}>
      <View
        style={{
          width: contents.width / 1.5,
          height: 150,
          backgroundColor: styles.MainColor,
        }}>
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: contents.width / 5,
          }}>
          <Image
            style={{width: 70, height: 70, borderRadius: 25}}
            source={require('../screen/home/scrollableTabView/HomeTab/image/registAppIcon.png')}
          />
          <Text
            style={{
              fontSize: 17,
              fontWeight: '700',
              color: 'white',
              marginTop: 10,
            }}>
            트로트 판
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 70,
          justifyContent: 'center',
          borderBottomColor: styles.lightGreyColor,
          borderBottomWidth: 1,
          paddingLeft: 20,
        }}>
        <DrawerKakao />
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          Alert.alert(
            '리뷰를 남기시겠습니까?',
            '\n사용자님의 칭찬 리뷰와 개선 요청사항의 글은 개발자에게 힘이됩니다. \n\n리뷰로 응원의 글을 남겨주시면 더욱 더 좋은 앱으로 발전시키겠습니다. \n\n좋은 하루 되세요 ^^',
            [
              {
                text: '다음에 남길게요^^',
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: '리뷰 남기기',
                onPress: () =>
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.trot_frontend',
                  ),
              },
            ],
          );
        }}>
        <View
          style={{
            height: 70,
            borderBottomColor: styles.lightGreyColor,
            borderBottomWidth: 1,
            paddingLeft: 25,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <IoniconsIcons name={'thumbs-up'} size={30} color={'#055B94'} />
          <Text style={{marginLeft: 20, fontWeight: '700'}}>응원하기</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          const {data} = Linking.openURL(
            'mailto:joon500006@gmail.com?subject=트로트 판 어플관련 문의',
          );
        }}>
        <View
          style={{
            height: 70,
            borderBottomColor: styles.lightGreyColor,
            borderBottomWidth: 1,
            paddingLeft: 25,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <IoniconsIcons name={'mail'} size={30} color={styles.darkGreyColor} />
          <Text style={{marginLeft: 20, fontWeight: '700'}}>
            문의하기 (G-Mail 사용)
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CustomSidebarMenu;
