import { AsyncStorage } from 'react-native';
import { 
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL 
} from './types';

const APP_ID = '265680427298924'; 

export const facebookLogin = () => async dispatch => {
  const token = await AsyncStorage.getItem('fb_token');
  
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  try {
    /*
    const { token, type } = await Facebook.logInWithReadPermissionsAsync(
      APP_ID, { permissions: ['public_profile'] }
    );
  
    if (type === 'cancel') {
      const err = 'Cancel type has been given';
      return dispatch({ type: FACEBOOK_LOGIN_FAIL, payload: err });
    } 
  
    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });*/
  } catch (err) {
    dispatch({ type: FACEBOOK_LOGIN_FAIL, payload: err });
  }
};
