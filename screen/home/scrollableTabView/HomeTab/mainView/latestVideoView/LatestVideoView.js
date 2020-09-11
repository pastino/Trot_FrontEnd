import React, {useState} from 'react';
import {View, Text, Image, ToastAndroid} from 'react-native';
import moment from 'moment';
import {useQuery} from 'react-apollo-hooks';
import {SEE_LATEST_VIDEO} from '../../../../../Query';
import contents from '../../../../../../contents';
import styles from '../../../../../../styles';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import IoniconsIcons from '../../../../../../components/IoniconsIcons';

const LatestVideoView = ({navigation, favorite}) => {
  const today = new Date();
  const [palyLists, setPlayLists] = useState([]);
  const {data, loading} = useQuery(SEE_LATEST_VIDEO);
  const [allSelect, setAllSelect] = useState(false);

  const selectMusicHandle = ({video, index}) => {
    if (palyLists.map((obj) => obj.video.videoId).includes(video.videoId)) {
      setPlayLists(
        palyLists.filter((obj) => obj.video.videoId !== video.videoId),
      );
    } else {
      setPlayLists(palyLists.concat({video, index}));
    }
  };

  const allSelectMusicHandle = () => {
    let allVideo = [];
    const videos = data && data.seeLatestVideo;
    for (let i = 0; i < videos.length; i++) {
      allVideo.push({video: videos[i], index: [i]});
    }
    setPlayLists(allVideo);
  };

  return (
    <View style={{}}>
      <View
        style={{
          padding: 10,
          marginBottom: 7,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          {allSelect ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setPlayLists([]);
                setAllSelect(!allSelect);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IoniconsIcons
                  name={'close-circle'}
                  color={styles.darkGreyColor}
                  size={25}
                />
                <Text
                  style={{
                    justifyContent: 'flex-end',
                    fontWeight: '700',
                    color: styles.darkGreyColor,
                    marginLeft: 7,
                    fontSize: 12,
                  }}>
                  선택취소
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                allSelectMusicHandle();
                setAllSelect(!allSelect);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IoniconsIcons
                  name={'checkmark-sharp'}
                  color={styles.darkGreyColor}
                  size={25}
                />
                <Text
                  style={{
                    justifyContent: 'flex-end',
                    fontWeight: '700',
                    color: styles.darkGreyColor,
                    marginLeft: 7,
                    fontSize: 12,
                  }}>
                  전체선택
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (palyLists.length === 0) {
                ToastAndroid.show('선택한 곡이 없습니다', ToastAndroid.SHORT);
              } else {
                navigation.navigate('MusicPlayer', {
                  videos: palyLists
                    .sort((a, b) => a.index - b.index)
                    .map((video) => video.video),
                });
              }
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IoniconsIcons
                name={'caret-forward'}
                color={
                  palyLists.length > 0 ? styles.MainColor : styles.darkGreyColor
                }
                size={25}
              />
              <Text
                style={{
                  justifyContent: 'flex-end',
                  fontWeight: '700',
                  color:
                    palyLists.length > 0
                      ? styles.MainColor
                      : styles.darkGreyColor,
                  marginRight: 10,
                  fontSize: 12,
                }}>
                선택재생
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('MusicPlayer', {
                videos: data && data.seeLatestVideo,
              })
            }>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IoniconsIcons
                name={'caret-forward'}
                color={styles.MainColor}
                size={25}
              />
              <Text
                style={{
                  justifyContent: 'flex-end',
                  fontWeight: '700',
                  color: styles.MainColor,
                  marginRight: 10,
                  fontSize: 12,
                }}>
                전체재생
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: contents.width,
          height: 20,
          zIndex: 1,
        }}>
        <View
          style={{
            width: contents.width,
            flexDirection: 'row',
            padding: 10,
          }}>
          <View
            style={{
              width: contents.width / 1.6 + 50,
              paddingLeft: 10,
            }}></View>
          <View
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '700', color: styles.darkGreyColor}}>
              출시일
            </Text>
          </View>
        </View>
      </View>
      {data &&
        data.seeLatestVideo &&
        data.seeLatestVideo.map((video, index) => (
          <View key={index}>
            <View
              key={video.videoId}
              style={{
                flexDirection: 'row',
                width: contents.width,
                height: 70,
                borderBottomColor: styles.lightGreyColor,
                borderBottomWidth: 1,
                backgroundColor: palyLists
                  .map((obj) => obj.video.videoId)
                  .includes(video.videoId)
                  ? styles.lightGreyColor
                  : null,
              }}>
              <TouchableWithoutFeedback
                style={{flexDirection: 'row'}}
                onPress={() =>
                  selectMusicHandle({
                    video,
                    index,
                  })
                }>
                <View
                  style={{
                    width: contents.width,
                    flexDirection: 'row',
                    padding: 10,
                  }}>
                  <Image
                    resizeMode={'cover'}
                    source={{
                      uri: video.thumbnail,
                    }}
                    style={{width: 50, height: 50, borderRadius: 20}}
                  />
                  <View
                    style={{
                      width: contents.width / 1.6,
                      paddingLeft: 10,
                    }}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{
                        fontSize: 15,
                        width: contents.width / 1.6 / 1.2,
                        fontWeight: '700',
                      }}>
                      {video.title}
                    </Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{
                        fontSize: 12,
                        marginTop: 5,
                        color: styles.darkGreyColor,
                      }}>
                      {video.singer}
                    </Text>
                  </View>

                  <View
                    style={{
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: styles.darkGreyColor}}>
                      {moment(video.releaseDate).format('MM/DD')}
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: styles.darkGreyColor}}>
                      {video.duration}
                    </Text>
                  </View> */}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        ))}
      <TouchableOpacity
        onPress={() => navigation.navigate('LatestAllVideo', {favorite})}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 17,
          }}>
          <Text style={{fontWeight: '700', color: styles.darkGreyColor}}>
            최신곡 더보기
          </Text>
          <IoniconsIcons
            name={'chevron-down-outline'}
            size={20}
            color={styles.darkGreyColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LatestVideoView;
