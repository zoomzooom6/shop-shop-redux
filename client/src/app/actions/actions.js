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

export const updateCategories = (categories) => {
    return {type: UPDATE_CATEGORIES, categories}
}

export const updateCurrentCategory = (category) => {
    return {type: UPDATE_CURRENT_CATEGORY, category}
}

export const addCart = (item) => {
    return {type: ADD_TO_CART, item}
}

export const addMultipleToCart = (items) => {
    return {type: ADD_MULTIPLE_TO_CART, items}
}

export const removeCart = (item) => {
    return {type: REMOVE_FROM_CART, item}
}

export const updateCartQuantity = (cart, purchaseQuantity) => {
    return {type: UPDATE_CART_QUANTITY, cart, purchaseQuantity}
}

export const clearCart = () => {
    return {type: CLEAR_CART}
}

export const toggledCart = () => {
    return {type: TOGGLE_CART}
}