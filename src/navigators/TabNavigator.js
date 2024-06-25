import { View, Text, Image, Platform, Keyboard,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Add from '../assets/svg/Add.svg';
import _routes from '../routes/routes';
import { useSelector } from 'react-redux';
import ScreenNameEnum from '../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const selected = useSelector(state => state.auth.selectedRole);
  const userData = useSelector(state => state.auth.userData);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const renderTabScreens = () => {
    if (!userData) {
      return null;
    }

    let screens = [];
    if (userData.type === 'Parent') {
      screens = _routes.BOTTOMTAB_ROUTE;
    } else if (userData.type === 'Coach') {
      screens = _routes.BOTTOMTAB_COACH;
    } else if (userData.type === 'Player') {
      screens = _routes.BOTTOMTAB_PLAYER;
    }

    return screens.map(screen => (
      <Tab.Screen
        key={screen.name}
        name={screen.name}
        component={screen.Component}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={screen.logo} // Assuming you have imported icon for each screen
                style={{
                  width: focused ? 24 : 20,
                  height: focused ? 24 : 20,
                  tintColor: focused ? '#7756FC' : color,
                }}
              />
              <Text
                style={{
                  color: focused ? '#874BE9' : '#9DB2CE',
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                {screen.label}
              </Text>
            </View>
          ),
          tabBarLabel: screen.label,
        }}
      />
    ));
  };

  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ActivityIndicator  size={30} color={'#874be9'}/>
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="HOME_ROUTE" // Set the default tab to Home
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          display: isKeyboardVisible ? 'none' : 'flex',
        },
      }}>
      {renderTabScreens()}
    </Tab.Navigator>
  );
}
