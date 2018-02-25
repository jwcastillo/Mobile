import React from 'react';
import { 
  TabNavigator, 
  StackNavigator,
  DrawerNavigator 
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import {
  WelcomeScreen, WELCOME_SCREEN_KEY,
  AuthScreen, AUTH_SCREEN_KEY,
  HomeScreen, HOME_SCREEN_KEY,
  ConnectScreen, CONNECT_SCREEN_KEY,
  WatchScreen, WATCH_SCREEN_KEY,
  BluetoothScreen, BLUETOOTH_SCREEN_KEY,
  CreateContractScreen, CREATE_CONTRACT_SCREEN_KEY,
  ContractsScreen, CONTRACTS_SCREEN_KEY,
  ContractsManageScreen, CONTRACTS_MANAGE_SCREEN_KEY,
  ContractDetailsScreen, CONTRACT_DETAILS_SCREEN_KEY,
  EmulationScreen, EMULATION_SCREEN_KEY,
  MAIN_SCREEN_KEY
} from '../screens';
import SideMenu from './SideMenu';

const DISABLE_SWIPE_NAV_OPTION = {
  swipeEnabled: false,
  animationEnabled: false
};

const DrawerStack = DrawerNavigator({
  [HOME_SCREEN_KEY]: { 
    screen: HomeScreen
  },
  [CONTRACTS_SCREEN_KEY]: {
    screen: StackNavigator({
      [CONTRACTS_SCREEN_KEY]: { screen: ContractsScreen },
      [CREATE_CONTRACT_SCREEN_KEY]: { screen: CreateContractScreen },
      [CONTRACTS_MANAGE_SCREEN_KEY]: { 
        screen: StackNavigator({
          [CONTRACTS_MANAGE_SCREEN_KEY]: { screen: ContractsManageScreen },
          [CONTRACT_DETAILS_SCREEN_KEY]: { screen: ContractDetailsScreen },
          [EMULATION_SCREEN_KEY]: { screen: EmulationScreen }
        }, { headerMode: 'none' })
      }
    }, { headerMode: 'none' })
  },
  [CONNECT_SCREEN_KEY]: {
    screen: StackNavigator({
      [CONNECT_SCREEN_KEY]: { screen: ConnectScreen },
      [BLUETOOTH_SCREEN_KEY]: { screen: BluetoothScreen }
    }, { headerMode: 'none' })
  },
  [WATCH_SCREEN_KEY]: {
    screen: WatchScreen
  }
}, 
{
  drawerWidth: 300,
  contentComponent: SideMenu
}
);

const Navigator = TabNavigator({
  [WELCOME_SCREEN_KEY]: { screen: WelcomeScreen },
  [AUTH_SCREEN_KEY]: { screen: AuthScreen },
  [MAIN_SCREEN_KEY]: {
    screen: StackNavigator({
      DrawerStack: { screen: DrawerStack }
    },
    {
      navigationOptions: ({ navigation }) => ({
          headerMode: 'float',
          headerStyle: { height: 35 },
          headerLeft: (
            <Icon
              iconStyle={{ marginLeft: 10, zIndex: -100 }}
              size={25}
              onPress={() => navigation.navigate('DrawerOpen')} 
              name={'menu'}
              color={'black'}
            />
          ),
        })
    })
  }
},
{
  ...DISABLE_SWIPE_NAV_OPTION,
  tabBarPosition: 'bottom',
  navigationOptions: {
    tabBarVisible: false
  },
});

export { Navigator };
