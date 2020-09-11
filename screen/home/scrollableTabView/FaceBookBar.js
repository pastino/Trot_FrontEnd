import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import IoniconsIcons from '../../../components/IoniconsIcons';
import styles from '../../../styles';

class FaceBookBar extends React.Component {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
    this.tabs = [
      {text: '영상', icon: 'videocam'},
      {text: 'Top', icon: 'thumbs-up-sharp'},
      {text: '명곡', icon: 'disc'},
      {text: 'DJ', icon: 'headset'},
      {text: '가수', icon: 'mic'},
      {text: '즐겨찾기', icon: 'star'},
    ];
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(
      this.setAnimationValue.bind(this),
    );
  }

  setAnimationValue({value}) {
    this.icons.forEach((icon, i) => {
      const progress = value - i >= 0 && value - i <= 1 ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return (
      <View
        style={{
          height: 70,
          flexDirection: 'row',
          paddingTop: 5,
          borderWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomColor: 'rgba(0,0,0,0.05)',
        }}>
        {this.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab.icon}
              onPress={() => this.props.goToPage(i)}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IoniconsIcons
                name={tab.icon}
                color={
                  this.props.activeTab === i
                    ? styles.MainColor
                    : 'rgb(204,204,204)'
                }
                size={30}
              />
              <Text
                style={{
                  fontSize: 10,
                  color:
                    this.props.activeTab === i
                      ? styles.MainColor
                      : 'rgb(204,204,204)',
                  fontWeight: this.props.activeTab === i ? '700' : null,
                }}>
                {tab.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default FaceBookBar;
