import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo-hooks';
import {ThemeProvider} from 'styled-components';
// import {persistCache} from 'apollo-cache-persist';
import {ApolloClient} from 'apollo-client';
// import ApolloClient from 'apollo-boost';
import options from './apollo';
// import {AuthProvider} from './AuthContext';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import MainNavigation from './navigation/MainNavigation';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink, Observable, split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [splashFinish, setSplashFinish] = useState(false);

  const preLoad = async () => {
    try {
      const cache = new InMemoryCache();
      const request = async (operation) => {
        const token = await AsyncStorage.getItem('jwt');
        return operation.setContext({
          headers: {Authorization: `Bearer ${token}`},
        });
      };

      const requestLink = new ApolloLink(
        (operation, forward) =>
          new Observable((observer) => {
            let handle;
            Promise.resolve(operation)
              .then((oper) => request(oper))
              .then(() => {
                handle = forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch(observer.error.bind(observer));

            return () => {
              if (handle) handle.unsubscribe();
            };
          }),
      );

      const httpLink = new HttpLink({
        uri: options.httpLink,
        credentials: 'include',
      });

      const wsLink = new WebSocketLink({
        uri: options.wsLink,
        options: {
          reconnect: true,
          lazy: true,
        },
      });

      const client = new ApolloClient({
        link: ApolloLink.from([
          onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors) {
              console.log(graphQLErrors);
            }
            if (networkError) {
              console.log(networkError);
            }
          }),
          requestLink,
          split(
            // split based on operation type
            ({query}) => {
              const definition = getMainDefinition(query);
              console.log(definition.operation);
              return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
              );
            },
            wsLink,
            httpLink,
          ),
        ]),
        cache,
      });
      setLoaded(true);
      setClient(client);
      setSplashFinish(true);
      SplashScreen.hide();
    } catch (e) {
      console.log(e);
    }
  };

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    // If Premission granted proceed towards token fetch

    if (enabled) {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          // user has a device token
          const token = await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method.
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
          fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
          }
        }
      } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
      }
    }
  };

  const displayNotification = (title, body) => {
    null;
  };

  const createNotificationListeners = async () => {
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();

    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      displayNotification(title, body);
    }
  };
  const CHANNEL_ID = 'com.trot_frontend';
  const APP_NAME = 'trot';
  const DESCRIPTION = '트로트 무료듣기';

  const channel = new firebase.notifications.Android.Channel(
    CHANNEL_ID,
    APP_NAME,
    firebase.notifications.Android.Importance.Max,
  ).setDescription(DESCRIPTION);
  firebase.notifications().android.createChannel(channel);

  const notificationListener = firebase
    .notifications()
    .onNotification((notification) => {
      // Process your notification as required
      notification.android.setPriority(
        firebase.notifications.Android.Priority.Max,
      );
      notification.android.setChannelId(CHANNEL_ID);
      notification.android.setBigPicture(
        'https://saleappimage.s3.ap-northeast-2.amazonaws.com/sale/first.png',
      );
      notification.android.setSmallIcon(
        require('./screen/home/scrollableTabView/HomeTab/image/notificationImage.png'),
      );
      firebase.notifications().displayNotification(notification);
    });
  const notificationDisplayedListener = firebase
    .notifications()
    .onNotificationDisplayed(() => {});
  const notificationOpenedListener = firebase
    .notifications()
    .onNotificationOpened((notificationOpen) => {
      if (onNotificationOpened && typeof onNotificationOpened === 'function') {
        onNotificationOpened(notificationOpen.notification.data);
      }
    });

  useEffect(() => {
    preLoad();
    checkPermission();
    createNotificationListeners();
  }, []);

  return loaded && client && splashFinish ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        {/* <AuthProvider isLoggedIn={isLoggedIn}> */}
        <MainNavigation />
        {/* </AuthProvider> */}
      </ThemeProvider>
    </ApolloProvider>
  ) : null;
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  // 언제 업데이트를 체크하고 반영할지를 정한다.
  // ON_APP_RESUME은 Background에서 Foreground로 오는 것을 의미
  // ON_APP_START은 앱이 실행되는(켜지는) 순간을 의미
  updateDialog: false,
  // 업데이트를 할지 안할지 여부에 대한 노출 (잠수함 패치의 경우 false)
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 60 * 10,
  // 업데이트를 어떻게 설치할 것인지 (IMMEDIATE는 강제설치를 의미)
};

export default codePush(codePushOptions)(App);
