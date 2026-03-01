import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import mobileAds from 'react-native-google-mobile-ads';
import SplashScreen from './src/SplashScreen';
import HomeScreens from './src/HomeScreens';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    try {
      mobileAds()
        .initialize()
        .then(adapterStatuses => {
          console.log('AdMob initialized');
        })
        .catch(e => console.log('AdMob init error:', e));
    } catch (error) {
      console.log('Note: AdMob not available in this environment');
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 