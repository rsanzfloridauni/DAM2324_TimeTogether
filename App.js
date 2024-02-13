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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ScreenTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Friends") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } else if (route.name === "Events") {
            iconName = focused ? "ios-calendar" : "ios-calendar-outline";
          } else if (route.name === "Ajustes") {
            iconName = focused ? "ios-settings" : "ios-settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        tabBarActiveTintColor: "#666666",
        tabBarInactiveTintColor: "rgba(128, 128, 128, 0.5)",
      }}
    >
      <Tab.Screen
        name="Friends"
        component={FriendStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Events"
        component={EventStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Ajustes"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
const FriendStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Friends"
        component={FriendsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Group"
        component={Group}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FriendsInfo"
        component={FriendsInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewGroup"
        component={NewGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InfoGrupo"
        component={InfoGrupo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const EventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventInfo"
        component={EventInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewEvent"
        component={NewEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DateInfo"
        component={DateInfo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModificarDatos"
        component={ModificarDatos}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ScreensProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SingUp"
            component={SignUP}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScreenTab"
            component={ScreenTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ScreensProvider>
  );
}
