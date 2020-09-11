import React from 'react';
import {View, Text} from 'react-native';
import contents from '../contents';

const DrawerContent = () => {
  return (
    <View style={{width: contents.width / 2}}>
      <Text>테스트</Text>
    </View>
  );
};

export default DrawerContent;
