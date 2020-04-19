//Menggabungkan Beberapa reducers menjadi 1 fungsi reducer
//menggunakan combineReducers

import {combineReducers} from 'redux';
import homeReducer from './home';

const reducers = combineReducers({
  home: homeReducer,
});

export default reducers;
