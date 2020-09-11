import React from 'react';
import {View, Text} from 'react-native';
import contents from '../../../../../contents';
import styles from '../../../../../styles';

const Duration = ({duration}) => {
  const firstSplit = duration.split('T')[1];
  const secondSplit = firstSplit.split('M');
  const minute = secondSplit[0];
  const thirdSplit =
    secondSplit[1].split('S')[0] === ''
      ? '00'
      : secondSplit[1].split('S')[0] < 10
      ? `0${secondSplit[1].split('S')[0]}`
      : secondSplit[1].split('S')[0];

  return (
    <Text
      style={{
        fontSize: 12,
        color: styles.darkGreyColor,
      }}>
      {`${minute}:${thirdSplit}`}
    </Text>
  );
};

export default Duration;
