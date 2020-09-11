import React, {useState} from 'react';
import {View, Text} from 'react-native';
import TopSong from '../../TopSong';

const SmallSizeVideo = ({
  navigation,
  data,
  loading,
  refetch,
  fetchMore,
  program,
}) => {
  const [favorite, setFavorite] = useState([]);
  return (
    <>
      <View style={{flex: 1}}>
        <TopSong
          navigation={navigation}
          favorite={favorite}
          setFavorite={setFavorite}
          data={data && data.seeProgramVideo}
          loading={loading}
          fetchMore={fetchMore}
          division={'program'}
          program={program}
        />
      </View>
    </>
  );
};

export default SmallSizeVideo;
