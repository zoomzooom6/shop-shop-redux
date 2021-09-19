import React from 'react';
//import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../app/actions';
import { idbPromise } from "../../utils/helpers";
import { connect } from 'react-redux'


const CartItem = ({ item }) => {
    //const [, dispatch] = useStoreContext();

    const removeFromCart = item => {
        this.props.rmvFromCart(item._id);
        idbPromise('cart', 'delete', { ...item });
    };

    const onChange = (e) => {
        const value = e.target.value;

        if (value === '0') {
            this.props.rmvFromCart(item._id);

            idbPromise('cart', 'delete', { ...item });
        } else {
            this.props.updateCartQuantity(item._id, value);

            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
    };

    return (
        <div className="flex-row">
            <div>
                <img
                    src={`/images/${item.image}`}
                    alt=""
                />
            </div>
            <div>
                <div>{item.name}, ${item.price}</div>
                <div>
                    <span>Qty:</span>
                    <input
                        type="number"
                        placeholder="1"
                        value={item.purchaseQuantity}
                        onChange={onChange}
                    />
                    <span
                        role="img"
                        aria-label="trash"
                        onClick={() => removeFromCart(item)}
                    >
                        🗑️
                    </span>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        rmvFromCart: (id) => {dispatch({type: REMOVE_FROM_CART, _id: id})},
        updateCartQuantity: (id, price) => {dispatch({type: UPDATE_CART_QUANTITY, _id: id, purchaseQuantity: parseInt(price)})}
    }
}

export default connect(mapDispatchToProps)(CartItem);