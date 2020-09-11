import React, {Component, useEffect} from 'react';
import {Alert, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

const Notification = () => {
  // const checkPermission = async () => {
  //   const enabled = await firebase.messaging().hasPermission();
  //   // If Premission granted proceed towards token fetch

  //   if (enabled) {
  //     let fcmToken = await AsyncStorage.getItem('fcmToken');
  //     if (!fcmToken) {
  //       fcmToken = await firebase.messaging().getToken();
  //       if (fcmToken) {
  //         // user has a device token
  //         await AsyncStorage.setItem('fcmToken', fcmToken);
  //       }
  //     }
  //   } else {
  //     // If permission hasn’t been granted to our app, request user in requestPermission method.
  //     try {
  //       await firebase.messaging().requestPermission();
  //       // User has authorised
  //       let fcmToken = await AsyncStorage.getItem('fcmToken');
  //       if (!fcmToken) {
  //         fcmToken = await firebase.messaging().getToken();
  //         if (fcmToken) {
  //           // user has a device token
  //           await AsyncStorage.setItem('fcmToken', fcmToken);
  //         }
  //       }
  //     } catch (error) {
  //       // User has rejected permissions
  //       console.log('permission rejected');
  //     }
  //   }
  // };

  // const displayNotification = (title, body) => {
  //   // we display notification in alert box with title and body
  //   null;
  //   // Alert.alert(
  //   //     title,
  //   //     body,
  //   //     [{text: 'Ok', onPress: () => console.log('ok pressed')}],
  //   //     {cancelable: false},
  //   //   );
  // };

  // const createNotificationListeners = async () => {
  //   // This listener triggered when notification has been received in foreground
  //   // this.notificationListener = firebase
  //   //   .notifications()
  //   //   .onNotification((notification) => {
  //   //     const {title, body} = notification;
  //   //     displayNotification(title, body);
  //   //   });

  //   // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
  //   // this.notificationOpenedListener = firebase
  //   //   .notifications()
  //   //   .onNotificationOpened((notificationOpen) => {
  //   //     const {title, body} = notificationOpen.notification;
  //   //     displayNotification(title, body);
  //   //   });

  //   // This listener triggered when app is closed and we click,tapped and opened notification
  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification();
  //   console.log(notificationOpen);
  //   if (notificationOpen) {
  //     const {title, body} = notificationOpen.notification;
  //     displayNotification(title, body);
  //   }
  // };

  useEffect(() => {
    checkPermission();
    createNotificationListeners();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>React Native Push Notification</Text>
    </View>
  );
};

export default Notification;
