import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Favourite from '../screens/Favourite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack';
import GameDetails from '../screens/GameDetails';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GameDetails"
        component={GameDetails}
        options={({route}) => ({title: route.params?.title})}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {backgroundColor: '#AD40AF'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'gold',
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#AD40AF',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: 'gold'},
          tabBarIcon: ({color, size}) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log(routeName);

  if(routeName == 'GameDetails'){
    return 'none';
  }
  return 'flex' ;
};

export default TabNavigator;
