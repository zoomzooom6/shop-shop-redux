import React, { useEffect } from "react";
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
//import { useStoreContext } from '../../utils/GlobalState';
//import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../app/actions/action-types/actions";
import { toggledCart, addMultipleToCart } from "../../app/actions/actions";
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
//import { connect } from 'react-redux'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    //const [state, dispatch] = useStoreContext();
    const dispatch = useDispatch();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    const { cart, cartOpen } = useSelector(this.state);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch(addMultipleToCart(cart));
        };

        if (!cart.length) {
            getCart();
        }
    }, [cart.length, dispatch]);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data, dispatch]);

    function toggleCart() {
        dispatch(toggledCart());
    }

    function calculateTotal() {
        let sum = 0;
        cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];

        cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });

        getCheckout({
            variables: { products: productIds }
        });
    }

    if (!cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span
                    role="img"
                    aria-label="trash">🛒</span>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {cart.length ? (
                <div>
                    {cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ?
                                <button onClick={submitCheckout}>
                                    Checkout
                                </button>
                                :
                                <span>(log in to check out)</span>
                        }
                    </div>
                </div>
            ) : (
                <h3>
                    <span role="img" aria-label="shocked">
                        😱
                    </span>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;

// const mapStateToProps = state => {
//     return {
//         cart: state.cart,
//         cartOpen: state.cartOpen
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         toggle_cart: () => { dispatch({ type: TOGGLE_CART }) },
//         add_multiple_to_cart: (cart) => { dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] }) }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);