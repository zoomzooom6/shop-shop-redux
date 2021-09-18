import React, { Component } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    return (
      <div className="container">
        <CategoryMenu />
        <ProductList />
        <Cart />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
    cart: state.cart
  }
}

// const Home = () => {
//   return (
//     <div className="container">
//       <CategoryMenu />
//       <ProductList />
//       <Cart />
//     </div>
//   );
// };

export default connect(mapStateToProps)(Home);
