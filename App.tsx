import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginView from "./components/login/login-view";
import LandingPage from "./components/landing/landing-page";
import CreateActivity from "./components/activity/create-activity";

export default function App() {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="LoginView">
        <Drawer.Screen name="Login" component={LoginView} />
        <Drawer.Screen name="Main" component={LandingPage} />
        <Drawer.Screen name="Activities" component={CreateActivity} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}