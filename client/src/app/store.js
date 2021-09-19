import { createStore } from 'redux'
import { reducer } from './reducers'

let initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
}

console.log(initialState);

const store = createStore(reducer, initialState);

export default store