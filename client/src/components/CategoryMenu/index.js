import React, { useEffect } from 'react';
import { updateCategories, updateCurrentCategory } from '../../app/actions/actions';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';

const CategoryMenu = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state);

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch(updateCategories(categoryData.categories));

      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch(updateCategories(categories));
      });
    }
  }, [categoryData, dispatch, loading]);

  const handleClick = id => {
    dispatch(updateCurrentCategory(id));
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

export default CategoryMenu;