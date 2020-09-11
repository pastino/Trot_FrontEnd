import React, {Component} from 'react';
import RNKakaoLink from 'react-native-kakao-links';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';

const DrawerKakao = () => {
  const linkObject = {
    webURL: 'https://developers.kakao.com/docs/android/kakaotalk-link', //optional
    mobileWebURL: 'https://developers.kakao.com/docs/android/kakaotalk-link', //optional
    androidExecutionParams: 'shopId=1&itemId=24', //optional For Linking URL
    iosExecutionParams: 'shopId=1&itemId=24', //optional For Linking URL
  };

  const contentObject = {
    title: '트로트판 - 트로트 무료듣기, 미스터 트롯, 사랑의 콜센터',
    link: linkObject,
    imageURL:
      'https://saleappimage.s3.ap-northeast-2.amazonaws.com/sale/kakaoImage.png',
    desc: '트로트 인기곡, 신곡, 핫한 음악들을 무료로 즐겨보세요!!',
    imageWidth: 240, //optional
    imageHeight: 150, //optional
  };

  //5개의 속성 중 최대 3개만 표시해 줍니다. 우선순위는 Like > Comment > Shared > View > Subscriber 입니다.
  const socialObject = {
    likeCount: 12, //optional
    commentCount: 1, //optional
    sharedCount: 23, //optional
    viewCount: 10, //optional
    subscriberCount: 22, //optional
  };

  const buttonObject = {
    title: '앱으로보기', //required
    link: linkObject, //required
  };

  const commerceDetailObject = {
    regularPrice: 10000, //required,
  };

  const linkFeed = async () => {
    try {
      const options = {
        objectType: 'feed', //required
        content: contentObject, //required
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        linkFeed();
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 35, height: 27}}
          source={require('../../screen/home/scrollableTabView/HomeTab/image/kakaologo.png')}
        />
        <Text style={{marginLeft: 20, fontWeight: '700'}}>
          공유하기(카카오)
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DrawerKakao;
