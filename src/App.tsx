import { Navigation } from 'react-native-navigation';
import { registerScreens } from './navigation/register-pages';

registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.dismissAllModals();
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
});
