import { StyleSheet, View } from 'react-native';
import LoginView from './components/login-view/login-view';
import ActiveEmployeesList from './landing/active-employees-list';
import LandingPage from './landing/landing-page';

export default function App() {
  return (
    <View >
     {/* <LoginView/> */}
     {/* <LandingPage /> */}
     <ActiveEmployeesList/>
    </View>
  );
}
;
