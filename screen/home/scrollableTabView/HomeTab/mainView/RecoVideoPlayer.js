import React, {useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import YouTube from 'react-native-youtube';
import {ScrollView} from 'react-native-gesture-handler';
import contents from '../../../../../contents';
import YoutubePlayer from 'react-native-youtube-iframe';
import styles from '../../../../../styles';

const RecoVideoPlayer = ({navigation}) => {
  const data = navigation.getParam('data');
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {isLoading ? (
          <View
            style={{
              width: contents.width,
              height: 230,
              backgroundColor: styles.lightGreyColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={styles.MainColor} size={30} />
          </View>
        ) : null}
        <YoutubePlayer
          webViewStyle={{
            flex: 1,
            alignSelf: 'stretch',
          }}
          height={isLoading ? 0 : contents.width / 1.77}
          videoId={`${data.videoId}?autoplay=1`}
          // playList={videos.map((video) => video.videoId)}
          // playListStartIndex={musicNumber}
          autoplay={true}
          onReady={() => setIsLoading(false)}
          play={true}
          onChangeState={(e) => {
            console.log(e);
          }}
          initialPlayerParams={{
            controls: true,
          }}
          userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
          playbackRate={1}
        />

        <Text
          style={{
            width: contents.width,
            textAlign: 'center',
            marginTop: 17,
            fontSize: 17,
            paddingLeft: 5,
            paddingRight: 5,
            fontWeight: '700',
            color: styles.darkGreyColor,
          }}>
          {data.title}
        </Text>
      </View>
    </ScrollView>
  );
};

export default RecoVideoPlayer;
