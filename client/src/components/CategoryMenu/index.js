import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../app/actions';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
//import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';
import { connect } from 'react-redux'

function CategoryMenu() {
  //const [state, dispatch] = useStoreContext();

  const { categories } = this.props.categories;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      this.props.updateCategory(categoryData.categories);

      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        this.props.updateCategory(categories);
      });
    }
  }, [categoryData, loading]);

  const handleClick = id => {
    this.props.updateCurrentCategory(id);
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCategory: (categories) => { dispatch({ type: UPDATE_CATEGORIES, categories: categories }) },
    updateCurrentCategory: (id) => { dispatch({ type: UPDATE_CURRENT_CATEGORY, currentCategory: id }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
