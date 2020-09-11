import React, {useEffect} from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import contents from '../../../../../contents';
import Modal from 'react-native-modal';
import IoniconsIcons from '../../../../../components/IoniconsIcons';

const ImageView = ({navigation, imageModal, setImageModal, avatar}) => {
  return (
    <Modal
      isVisible={imageModal}
      onBackdropPress={() => setImageModal(!imageModal)}
      onRequestClose={() => setImageModal(!imageModal)}
      hasBackdrop={false}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: contents.height - contents.width / 2.31,
            marginBottom: -20,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback
            style={{
              width: contents.width,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
            onPress={() => {
              console.log(2321);
              setImageModal(!imageModal);
            }}>
            <View
              style={{
                width: contents.width,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                paddingRight: 10,
              }}>
              <IoniconsIcons name={'close'} size={40} color={'white'} />
            </View>
          </TouchableWithoutFeedback>

          <Image
            style={{width: contents.width, height: contents.width}}
            source={{uri: avatar}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ImageView;
