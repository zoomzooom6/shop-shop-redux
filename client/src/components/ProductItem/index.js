import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from '../../utils/GlobalState';
//import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../app/actions/action-types/actions';
import { addCart, updateCartQuantity } from "../../app/actions/actions";
import { idbPromise } from '../../utils/helpers';
//import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  //const [state, dispatch] = useStoreContext();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch(updateCartQuantity(_id, itemInCart.purchaseQuantity));
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(addCart(item));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;

// const mapStateToProps = state => {
//   return {
//     cart: state.cart
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (item) => { dispatch({ type: ADD_TO_CART, product: { ...item, purchaseQuantity: 1 } }) },
//     updateCartQuantity: (id, quantity) => { dispatch({ type: UPDATE_CART_QUANTITY, _id: id, purchaseQuantity: parseInt(quantity) + 1 }) }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
