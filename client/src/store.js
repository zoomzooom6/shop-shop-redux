import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//import thunk from 'redux-thunk'
import reducers from './app/reducers/reducers'

const store = createStore(reducers);
console.log(store.getState())

export default store