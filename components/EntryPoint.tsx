import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Button,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import QuickActions from 'react-native-quick-actions';
import WebView from "react-native-webview";

// npx uri-scheme open mychat://settings --ios


const Settings1 = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TextInput>DetailsScreen</TextInput>
      <Button
        title={'Go Home'}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

const Home1 = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TextInput>Home</TextInput>
      <Button
        title={'Go to settings'}
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    </View>
  );
};

const WebPage1 = ({navigation}: any) => {
    return (
        <WebView
            source={{
                uri:
                    'https://www.youtube.com/watch?v=tlUcmD0zPI4&ab_channel=ChillMusicLab',
            }}
        />
    );
};

const Tab = createStackNavigator();

const navigationRef = React.createRef<any>();

const navigateObject = (name: string, params: any) => {
    if (navigationRef.current) {
        navigationRef.current && navigationRef.current?.navigate(name, params);
    }
};

const navigateToSettings = () => {
  navigateObject('Settings', {});
};

const navigateToWeb = () => {
    navigateObject('WebPage', {});
};

DeviceEventEmitter.addListener('quickActionShortcut', data => {
});

const doSomethingWithTheAction = (data: any) => {
    if (data?.userInfo.url === 'mychat://settings') {
        navigateToSettings();
    }

    if (data?.userInfo.url === 'mychat://web') {
        navigateToWeb();
    }
};

QuickActions.popInitialAction()
  .then(doSomethingWithTheAction)
  .catch(console.error);

QuickActions.setShortcutItems([
  {
    type: 'Orders', // Required
    title: 'Go to settings', // Optional, if empty, `type` will be used instead
    subtitle: "See orders you've made",
    icon: 'Compose', // Icons instructions below
    userInfo: {
      url: 'mychat://settings', // Provide any custom data like deep linking URL
    },
  },
    {
        type: 'Web', // Required
        title: 'Go to Web...', // Optional, if empty, `type` will be used instead
        subtitle: 'WebView',
        icon: 'Compose', // Icons instructions below
        userInfo: {
            url: 'mychat://web', // Provide any custom data like deep linking URL
        },
    },
]);

export const EntryPoint = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      // linking={linking}
      fallback={<Text>Loading...</Text>}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home1} />
        <Tab.Screen name="Settings" component={Settings1} />
          <Tab.Screen name="WebPage" component={WebPage1} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
