import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import AlbumMusicView from '../screen/home/scrollableTabView/HomeTab/albumMusicView/AlbumMusicView';
import MusicPlayer from '../screen/home/scrollableTabView/HomeTab/MusicPlayer';
import DrawerNavigation from './DrawerNavigation';
import Notification from '../components/notification/Notification';
import KakaoLink from '../components/kakaoLink/KakaoLink';
import SearchDataView from '../screen/home/scrollableTabView/HomeTab/SearchDataView';
import RecoVideoPlayer from '../screen/home/scrollableTabView/HomeTab/mainView/RecoVideoPlayer';
import ProgramVideoList from '../screen/home/scrollableTabView/HomeTab/mainView/programView/ProgramVideoList';
import SeePlayListView from '../screen/home/scrollableTabView/HomeTab/playList/SeePlayListView';
import LatestAllVideo from '../screen/home/scrollableTabView/HomeTab/mainView/latestVideoView/LatestAllVideo';

const MainNavigation = createStackNavigator(
  {
    DrawerNavigation,
    AlbumMusicView,
    MusicPlayer,
    Notification,
    KakaoLink,
    SearchDataView,
    RecoVideoPlayer,
    ProgramVideoList,
    SeePlayListView,
    LatestAllVideo,
  },
  {headerMode: 'none'},
);

export default createAppContainer(MainNavigation);
