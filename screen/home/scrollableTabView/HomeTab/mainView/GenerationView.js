import React, {useEffect, useState, useRef, createRef} from 'react';
import {Text, View, Image, ActivityIndicator, ToastAndroid} from 'react-native';
import {useQuery} from 'react-apollo-hooks';
import {SEE_GENERATION_VIDEO} from '../../../../Query';
import styles from '../../../../../styles';
import contents from '../../../../../contents';
import {
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import GenerationDiv from './GenerationDiv';
import IoniconsIcons from '../../../../../components/IoniconsIcons';

const GenerationView = ({navigation}) => {
  const {data, loading} = useQuery(SEE_GENERATION_VIDEO, {
    fetchPolicy: 'network-only',
  });

  const [videos, setVideos] = useState([]);
  const [palyLists, setPlayLists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);

  useEffect(() => {
    if (data !== undefined) {
      const dataVideo = data && data.seeGenerationVideo;
      setVideos([
        {
          division: '40대',
          generation: '여',
          videos:
            dataVideo &&
            dataVideo
              .filter((video) => video.division === 'generation(40f)')
              .sort((a, b) => a.ranking - b.ranking),
        },
        {
          division: '40대',
          generation: '남',
          videos:
            dataVideo &&
            dataVideo
              .filter((video) => video.division === 'generation(40m)')
              .sort((a, b) => a.ranking - b.ranking),
        },
        {
          division: '50대',
          generation: '여',
          videos:
            dataVideo &&
            dataVideo
              .filter((video) => video.division === 'generation(50f)')
              .sort((a, b) => a.ranking - b.ranking),
        },
        {
          division: '50대',
          generation: '남',
          videos:
            dataVideo &&
            dataVideo
              .filter((video) => video.division === 'generation(50m)')
              .sort((a, b) => a.ranking - b.ranking),
        },
      ]);
    }
  }, [data]);

  const [swiperIndex, setSwiperIndex] = useState(0);

  const swiper = useRef(null);

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
    const curretVideos = videos[swiperIndex].videos;
    for (let i = 0; i < curretVideos.length; i++) {
      allVideo.push({video: curretVideos[i], index: [i]});
    }
    setPlayLists(allVideo);
  };

  return (
    <View>
      {videos.length > 0 ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (swiperIndex === 1) {
                  swiper.current.scrollBy(-1, true);
                } else {
                  swiper.current.scrollTo(1, true);
                }
                setSwiperIndex(0);
              }}>
              <GenerationDiv
                generation={'40대'}
                gender={'여'}
                index={0}
                swiperIndex={swiperIndex}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (swiperIndex === 2) {
                  swiper.current.scrollBy(-1, true);
                } else {
                  swiper.current.scrollTo(2, true);
                }
                setSwiperIndex(1);
              }}>
              <GenerationDiv
                generation={'40대'}
                gender={'남'}
                index={1}
                swiperIndex={swiperIndex}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (swiperIndex === 3) {
                  swiper.current.scrollBy(-1, true);
                } else {
                  swiper.current.scrollTo(3, true);
                }
                setSwiperIndex(2);
              }}>
              <GenerationDiv
                generation={'50대'}
                gender={'여'}
                index={2}
                swiperIndex={swiperIndex}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (swiperIndex === 0) {
                  swiper.current.scrollBy(-1, true);
                } else {
                  swiper.current.scrollTo(4, true);
                }
                setSwiperIndex(3);
              }}>
              <GenerationDiv
                generation={'50대'}
                gender={'남'}
                index={3}
                swiperIndex={swiperIndex}
              />
            </TouchableOpacity>
          </View>
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
                    ToastAndroid.show(
                      '선택한 곡이 없습니다',
                      ToastAndroid.SHORT,
                    );
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
                      palyLists.length > 0
                        ? styles.MainColor
                        : styles.darkGreyColor
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
                    videos: videos[swiperIndex].videos,
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
          <Swiper
            ref={swiper}
            //   loop={true}
            //   autoplay={true}
            //   autoplayTimeout={5}
            onIndexChanged={(index) => {
              setPlayLists([]);
              setSwiperIndex(index);
            }}
            dotColor={styles.lightGreyColor}
            activeDotColor={'#ccf1ff'}
            showsPagination={false}
            height={'auto'}>
            {videos.map((item, index) => (
              <View key={index} style={{}}>
                {item.videos.map((video, index) => (
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
                            width: contents.width / 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontWeight: '700'}}>{index + 1}</Text>
                        </View>
                        <View
                          style={{
                            width: contents.width / 1.2,
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
                              width: contents.width / 1.8,
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
                              {video.duration}
                            </Text>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </Swiper>
        </>
      ) : (
        <View
          style={{
            width: contents.width,
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={styles.MainColor} size={30} />
        </View>
      )}
    </View>
  );
};

export default GenerationView;
