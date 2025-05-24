import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../../screens/home';
import {HomeStackParamList} from '../../types';
import NotificationScreen from '../../screens/notification/NotificationScreen';
import LeaveApplyScreen from '../../screens/leaves/LeaveApplyScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="LeaveApplyScreen" component={LeaveApplyScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
