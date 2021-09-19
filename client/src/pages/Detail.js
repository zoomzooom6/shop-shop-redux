import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
//import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../app/actions';
import { idbPromise } from '../utils/helpers';
import Cart from '../components/Cart';
import { connect } from 'react-redux';

function Detail() {
  //const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = this.props;

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } else if (data) {
      this.props.updateProducts(data.products);

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb 
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        this.props.updateProducts(indexedProducts);
      });
    }
  }, [products, data, loading, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)

    if (itemInCart) {
      this.props.updateCartQuantity(id);
      //purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1;
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      this.props.addToCart(...currentProduct);
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  }

  const removeFromCart = () => {
    this.props.removeFromCart(currentProduct.id);

    // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to cart</button>
            <button
              disabled={!cart.find(p => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
    cart: state.cart
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => { dispatch({ type: REMOVE_FROM_CART, _id: id }) },
    updateCartQuantity: (id) => { dispatch({ type: UPDATE_CART_QUANTITY, _id: id, purchaseQuantity: parseInt(id.purchaseQuantity) + 1 }) },
    addToCart: (item) => { dispatch({ type: ADD_TO_CART, product: { item, purchaseQuantity: 1 } }) },
    updateProducts: (product) => { dispatch({ type: UPDATE_PRODUCTS, products: product }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
