import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
//import { useStoreContext } from '../../utils/GlobalState';
//import { UPDATE_PRODUCTS } from '../../app/actions/action-types/actions';
import { updateProducts } from '../../app/actions/actions';
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
//import { connect } from 'react-redux'

const ProductList = () => {
  //const [state, dispatch] = useStoreContext();
  const dispatch = useDispatch();
  const { currentCategory, products } = useSelector((state) => state);
  //console.log(currentCategory);

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  console.log(data);

  useEffect(() => {
    if (data) {
      console.log('in useEffect hook');
      console.log(data.products)
      dispatch(updateProducts(data.products));
      console.log('after dispatch');
      //console.log(state.getState())

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch(updateProducts(products));
      });
    }
  }, [loading, data, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return data.products;
    }

    return data.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;

// const mapStateToProps = state => {
//   return {
//     products: state.products,
//     categories: state.categories,
//     currentCategory: state.currentCategory,
//     cart: state.cart,
//     cartOpen: state.cartOpen
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateProducts: (products) => { dispatch({ type: UPDATE_PRODUCTS, products: products }) }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
