import React, {useState, useEffect} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import contents from '../../../../contents';
import styles from '../../../../styles';
import IoniconsIcons from '../../../../components/IoniconsIcons';

const SearchBar = ({navigation}) => {
  const [value, setValue] = useState('');
  const onCahnge = (text) => {
    setValue(text);
  };

  return (
    <>
      <View
        style={{
          width: contents.width / 1.8,

          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          value={value}
          onChangeText={onCahnge}
          placeholder={'검색어'}
          placeholderTextColor={styles.darkGreyColor}
          returnKeyType={'search'}
          blurOnSubmit={true}
          onSubmitEditing={() => {
            if (value === '') {
              ToastAndroid.show('검색어를 입력해주세요', ToastAndroid.SHORT);
            } else {
              navigation.navigate('SearchDataView', {value});
            }
          }}
          style={{
            width: contents.width / 2.4,
            height: 43,
            padding: 10,
            color: 'black',
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            textAlignVertical: 'top',
            shadowColor: 'white',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 2,
            borderBottomLeftRadius: 2,
            borderTopLeftRadius: 2,
            borderWidth: 1,
            borderColor: 'white',
            borderBottomWidth: 0,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            if (value === '') {
              ToastAndroid.show('검색어를 입력해주세요', ToastAndroid.SHORT);
            } else {
              navigation.navigate('SearchDataView', {value});
            }
          }}>
          <View
            style={{
              width: 45,
              height: 43,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
            }}>
            <IoniconsIcons name={'search'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchBar;
