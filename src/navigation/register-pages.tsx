import { Navigation } from 'react-native-navigation';
import { HomeScreen } from '../pages/test/home-screen';
import { SettingsScreen } from '../pages/test/settings-screen';

export const registerScreens = () => {
  Navigation.registerComponent('Home', () => HomeScreen);
  Navigation.registerComponent('Settings', () => SettingsScreen);
};
