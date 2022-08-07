import { createStackNavigator } from "@react-navigation/stack";
import TasksScreen from "../screens/TasksScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import StartupScreen from "../screens/StartupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

//The navigation between screens of our app using React Navigation V6
const MainStackNavigator = createStackNavigator();
export const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <MainStackNavigator.Screen name="Startup" component={StartupScreen} />
      <MainStackNavigator.Screen name="Welcome" component={WelcomeScreen} />
      <MainStackNavigator.Screen
        name="Register"
        component={RegistrationScreen}
      />
      <MainStackNavigator.Screen name="Login" component={LoginScreen} />
      <MainStackNavigator.Screen name="Tasks" component={TasksScreen} />
    </MainStackNavigator.Navigator>
  );
};
