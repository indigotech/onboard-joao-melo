import { Navigation } from 'react-native-navigation';
import { WelcomeUser } from '../pages/welcome-user/index';
import { UserList } from '../pages/user-list/index';

Navigation.registerComponent('WelcomeUser', () => WelcomeUser);
Navigation.registerComponent('UserList', () => UserList);
