import {createStore, applyMiddleware} from 'redux';

import reducers from './reducer/index';
import promiseMiddleware from 'redux-promise-middleware';

const enhancers = applyMiddleware(promiseMiddleware);

const store = createStore(reducers, enhancers);

export default store;
