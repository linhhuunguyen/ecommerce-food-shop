import { useEffect } from 'react';
import CategoryListTable from 'modules/admin/category/list';
import { useHistory } from 'react-router-dom';
import { TopBox } from 'components/FormsUI';
import { useAppSelector, useAppDispatch } from 'store/hook';
import {
  getCategoriesSlug,
  getAdminCategories,
  getCategoriesDescendants
} from 'store/Categories/categories.slice';

import './styles.css';

export default function CategoryList() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { categoriesSlug, cateloryList, cate2, cate3 } = useAppSelector(
    (state) => state.categories
  );
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getAdminCategories(token));
    }
  }, [token, dispatch]);

  const handleClickCase1 = (id: any) => {
    if (id) {
      dispatch(getCategoriesDescendants(id));
    }
  };

  console.log(cate2);

  return (
    <>
      <TopBox
        title="Category"
        nameButton="Add Category"
        handle={() => history.push('category/add')}
      />

      {/* <CategoryListTable /> */}
      <div className="flex justify-between items-center mt-5 container">
        <div className="cate">
          {cateloryList.map((category) => (
            <div
              className="cate-1"
              key={category._id}
              onClick={() => handleClickCase1(category._id)}
            >
              {category.name}
            </div>
          ))}
        </div>
        <div className="cate cate-2">
          {cate2.map((item) => (
            <div
              className="cate-1"
              key={Math.random()}
              onClick={() => handleClickCase1(item._id)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="cate cate-3">
          {cate3.map((item) => (
            <div
              className="cate-1"
              key={Math.random()}
              onClick={() => handleClickCase1(item._id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
