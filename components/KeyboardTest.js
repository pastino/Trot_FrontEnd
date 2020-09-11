import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

export const KeyboardTest = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardDidShow = ({e: KeyboardEvent}) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);
  console.log(keyboardHeight);
  return [keyboardHeight];
};
