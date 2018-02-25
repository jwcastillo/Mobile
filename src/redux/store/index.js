import { 
  createStore, 
  applyMiddleware,
  combineReducers 
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { auth, watch, profile } from '../reducers';

const store = createStore(
  combineReducers({
    profile,
    auth,
    watch
  }), 
  {}, 
  composeWithDevTools(
    applyMiddleware(thunk) 
  )
);

export default store;

