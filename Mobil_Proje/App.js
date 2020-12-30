import * as React from 'react';
import { Home } from './pages/Home.js';
import { Calendar } from './pages/Calendar.js';
import { Memory } from './pages/Memory.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="Memory" component={Memory} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
