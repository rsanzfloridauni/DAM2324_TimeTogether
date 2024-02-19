import Login from "./src/screens/login.js";
import Start from "./src/screens/start.js";
import FriendsInfo from "./src/screens/friendsInfo.js";
import FriendsList from "./src/screens/friends.js";
import DateInfo from "./src/screens/dateInfo.js";
import SignUP from "./src/screens/singUp";
import Group from "./src/screens/group";
import InfoGrupo from "./src/screens/infoGrupo";
import EventInfo from "./src/screens/eventInfo.js";
import NewEvent from "./src/screens/newEvent";
import NewGroup from "./src/screens/newGroup";
import Settings from "./src/screens/settings";
import Calendar from "./src/screens/calendar";
import ModificarDatos from "./src/screens/modificarDatos";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScreensProvider } from "./src/screens/ScreenContext";
import React, { useState, useContext, useEffect } from 'react';
import i18n from 'i18n-js';
import { en, es } from './src/translation/localizations';
import ScreensContext from './src/screens/ScreenContext';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ScreenTab = () => {
  const { language } = useContext(ScreensContext);
  i18n.translations = { en, es };
  i18n.locale = language;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Friends" || route.name === "Amigos") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } else if (route.name === "Events" || route.name === "Eventos") {
            iconName = focused ? "ios-calendar" : "ios-calendar-outline";
          } else if (route.name === "Settings" || route.name === "Ajustes") {
            iconName = focused ? "ios-settings" : "ios-settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name={i18n.t('friends')}
        component={FriendStack}
        options={{ headerShown: false }} />
      <Tab.Screen
        name={i18n.t('events')}
        component={EventStack}
        options={{ headerShown: false }} />
      <Tab.Screen
        name={i18n.t('settings')}
        component={SettingsStack}
        options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};
const FriendStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FriendsList"
        component={FriendsList}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="Group"
        component={Group}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="FriendsInfo"
        component={FriendsInfo}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="NewGroup"
        component={NewGroup}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="InfoGrupo"
        component={InfoGrupo}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
const EventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="EventInfo"
        component={EventInfo}
        options={{ headerShown: false }}/>
      <Stack.Screen
        name="NewEvent"
        component={NewEvent}
        options={{ headerShown: false }}/>
      <Stack.Screen
        name="DateInfo"
        component={DateInfo}
        options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}/>
      <Stack.Screen
        name="ModificarDatos"
        component={ModificarDatos}
        options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default function App() {
  LogBox.ignoreLogs(["Require cycle:"])
  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;
  return (
    <ScreensProvider>
      <NavigationContainer independent={true}  screenOptions={{ headerShown: false }}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}/>
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ headerShown: false }}/>

          <Stack.Screen
            name="SingUp"
            component={SignUP}
            options={{ headerShown: false }}/>
          <Stack.Screen
            name="ScreenTab"
            component={ScreenTab}
            options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ScreensProvider>
  );
}
