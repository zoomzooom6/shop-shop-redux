import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { addCart, updateCartQuantity } from "../../app/actions/actions";
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch(updateCartQuantity(_id, itemInCart.purchaseQuantity + 1));
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
