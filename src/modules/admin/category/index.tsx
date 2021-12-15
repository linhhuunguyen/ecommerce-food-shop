import { useEffect, useState } from 'react';
import CategoryListTable from 'modules/admin/category/list';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { TopBox } from 'components/FormsUI';
import { useAppSelector, useAppDispatch } from 'store/hook';
import {
  getAdminCategories,
  getCate3,
  getCate2
} from 'store/Categories/categories.slice';

import './styles.css';

export default function CategoryList() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { cateloryList, cate2, cate3 } = useAppSelector(
    (state) => state.categories
  );

  const [level3, setLevel3] = useState(false);
  const [active, setActive] = useState('');
  const [active2, setActive2] = useState('');
  const [active3, setActive3] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryName2, setCategoryName2] = useState('');
  const [categoryName3, setCategoryName3] = useState('');
  const allCategory = [categoryName, categoryName2, categoryName3];

  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getAdminCategories(token));
    }
  }, [token, dispatch, level3]);

  const handleClickCase1 = (id: any, name: string) => {
    if (id) {
      setLevel3(false);
      dispatch(getCate2(id));
      setCategoryName(name);
      setActive(id);
    }
  };

  const handleClickCase2 = (id: any, name: string) => {
    if (id) {
      setActive2(id);
      dispatch(getCate3(id));
      setCategoryName2(name);
      setLevel3(true);
    }
  };

  const handleClickCase3 = (id: any, name: string) => {
    setActive3(id);
    setCategoryName3(name);
  };

  console.log(categoryName);
  console.log(categoryName2);
  console.log(categoryName3);
  console.log(allCategory);

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
              className={clsx(active === category._id ? 'active' : '', {
                'cate-1': 'cate-1'
              })}
              key={category._id}
              onClick={() => handleClickCase1(category._id, category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
        <div className="cate">
          {cate2 &&
            cate2.map((item) => (
              <div
                className={clsx(active2 === item._id ? 'active' : '', {
                  'cate-1': 'cate-1'
                })}
                key={Math.random()}
                onClick={() => handleClickCase2(item._id, item.name)}
              >
                {item.name}
              </div>
            ))}
        </div>
        <div className="cate">
          {level3 &&
            cate3.map((cate) => (
              <div
                className={clsx(active3 === cate._id ? 'active' : '', {
                  'cate-1': 'cate-1'
                })}
                key={Math.random()}
                onClick={() => handleClickCase3(cate._id, cate.name)}
              >
                {cate.name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
