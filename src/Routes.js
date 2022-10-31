import { View, Text } from 'react-native';
import { Animated, TouchableOpacity } from 'react-native';
import React from 'react';
import ChatApp from './screens/ChatApp';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import Contact from './screens/Contact';
import Cameras from './screens/Camera';
import uuid from 'react-uuid';
import Ionicons from '@expo/vector-icons/Ionicons';
import PhoneAuth from './screens/PhoneAuth';
import Status2 from './screens/Status2';

const Tab = createMaterialTopTabNavigator();
const Tab2 = createMaterialTopTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Chats'
        tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen
          name='Cameras'
          component={Cameras}
          options={{ tabBarLabel: 'Cameras' }}
        />
        <Tab.Screen
          name='Chats'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Chats',
          }}
        />
        <Tab.Screen
          name='Status'
          component={Status2}
          options={{
            tabBarLabel: 'Status',
          }}
        />
        <Tab.Screen
          name='Calls'
          component={Contact}
          options={{
            tabBarLabel: 'Calls',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row' }} key={uuid()}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        if (label == 'Cameras') {
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                height: 40,
                backgroundColor: '#075e54',
                width: 40,
              }}>
              <Animated.Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                <Ionicons
                  name='camera'
                  size={22}
                  color={isFocused ? 'white' : '#5C928B'}
                />
                <View>{options.tabBarBadge}</View>
              </Animated.Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={uuid()}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                height: 40,
                backgroundColor: '#075e54',
                borderBottomColor: isFocused ? '#5C928B' : '#075e54',
                borderBottomWidth: 5,
              }}>
              <Animated.Text
                style={{
                  color: isFocused ? 'white' : '#5C928B',
                  alignSelf: 'center',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}
