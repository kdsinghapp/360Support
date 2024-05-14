import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Add from '../assets/svg/Add.svg';
import _routes from '../routes/routes';
import {useSelector} from 'react-redux';
import ScreenNameEnum from '../routes/screenName.enum';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const selected = useSelector(state => state.auth.selectedRole);
  const userData = useSelector(state => state.auth.userData);

  const renderTabScreens = () => {
    if (userData?.type == 'Parent') {
      return _routes.BOTTOMTAB_ROUTE.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
    } else if (userData?.type == 'Coach') {
      return _routes.BOTTOMTAB_COACH.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
    } else if (userData?.type == 'Player') {
      return _routes.BOTTOMTAB_PLAYER.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
    // } else if (userData?.type == 'Child') {
    //   return _routes.BOTTOMTAB_ROUTE.map(screen => (
    //     <Tab.Screen
    //       key={screen.name}
    //       name={screen.name}
    //       component={screen.Component}
    //       options={{
    //         tabBarIcon: ({focused, color, size}) => (
    //           <View style={{alignItems: 'center', justifyContent: 'center'}}>
    //             <Image
    //               source={screen.logo} // Assuming you have imported icon for each screen
    //               style={{
    //                 width: focused ? 24 : 20,
    //                 height: focused ? 24 : 20,
    //                 tintColor: focused ? '#7756FC' : color,
    //               }}
    //             />
    //             <Text
    //               style={{
    //                 color: focused ? '#874BE9' : '#9DB2CE',
    //                 fontSize: 12,
    //                 fontWeight: '600',
    //               }}>
    //               {screen.label}
    //             </Text>
    //           </View>
    //         ),
    //         tabBarLabel: screen.label,
    //       }}
    //     />
    //   ));
    // } else {
      // Return null if userData is null or undefined
      return null;
    }
  };

  if (userData === null || userData === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '700', color: 'green'}}>
          Please ReLogin{' '}
        </Text>
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
        },
      }}>
      {renderTabScreens()}
    </Tab.Navigator>
  );
}
