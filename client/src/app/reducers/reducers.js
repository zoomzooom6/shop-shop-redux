import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from '../actions/types';

const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCTS:
            console.log(action);
            return {
                ...state,
                products: [...action.products || []]
            };
        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
            console.log(action);
            return {
                ...state,
                categories: [...action.categories || []]
            };
        case UPDATE_CURRENT_CATEGORY:
            console.log(action);
            return {
                ...state,
                currentCategory: action.category
            };
        case ADD_TO_CART:
            console.log(action);
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.item]
            };
        case ADD_MULTIPLE_TO_CART:
            console.log(action);
            return {
                ...state,
                cart: [...state.cart, ...action.items || []],
            };
        case REMOVE_FROM_CART:
            console.log(action);
            let newState = state.cart.filter(product => {
                console.log(product);
                return product._id !== action.item;
            });
            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
        case UPDATE_CART_QUANTITY:
            console.log(action);
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                })
            };
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };
        default:
            return state
    }
}

export default reducers;