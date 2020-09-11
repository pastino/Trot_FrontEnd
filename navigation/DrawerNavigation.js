// import {createDrawerNavigator} from '@react-navigation/drawer';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Home from '../screen/home/Home';
import contents from '../contents';
import CustomSidebarMenu from '../components/CustomSidebarMenu';

const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: '트로트 무료듣기',
      },
    },
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerWidth: contents.width / 1.5,
    drawerPosition: 'left',
    initialRouteName: 'Home',
  },
);

export default createAppContainer(Drawer);
