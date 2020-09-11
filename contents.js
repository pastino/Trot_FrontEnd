import {Dimensions} from 'react-native';
import {useState} from 'react';

// const [test, setTest] = useState();

// const isPortrait = () => {
//   const dim = Dimensions.get('window');
//   return dim.height >= dim.width;
// };

// const isLandscape = () => {
//   const dim = Dimensions.get('window');
//   return dim.width >= dim.height;
// };

// Dimensions.addEventListener('change', () => {
//   setTest(isPortrait() ? 'portrait' : 'landscape');
// });

const {width, height} = Dimensions.get('window');

export default {width, height};
