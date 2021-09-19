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
} from "./types";

export const updateProducts = (products) => {
    return {type: UPDATE_PRODUCTS, products}
}

export const updateCategories = () => {
    return {type: UPDATE_CATEGORIES}
}

export const updateCurrentCategory = () => {
    return {type: UPDATE_CURRENT_CATEGORY}
}

export const addCart = () => {
    return {type: ADD_TO_CART}
}

export const addMultipleToCart = () => {
    return {type: ADD_MULTIPLE_TO_CART}
}

export const removeCart = () => {
    return {type: REMOVE_FROM_CART}
}

export const updateCartQuantity = () => {
    return {type: UPDATE_CART_QUANTITY}
}

export const clearCart = () => {
    return {type: CLEAR_CART}
}

export const toggledCart = () => {
    return {type: TOGGLE_CART}
}