import { createStore } from 'redux';
import rootreducer from './redux/reducer/main';
const store = createStore(rootreducer);
export default store;
