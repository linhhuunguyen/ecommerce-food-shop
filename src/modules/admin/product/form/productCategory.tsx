import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Button from 'components/button';
import { useAppSelector, useAppDispatch } from 'store/hook';
import {
  getAdminCategories,
  getCate3,
  getCate2
} from 'store/Categories/categories.slice';

import './styles.css';

function ProductCategory() {
  const dispatch = useAppDispatch();
  const { cateloryList, cate2, cate3 } = useAppSelector(
    (state) => state.categories
  );
  const { token } = useAppSelector((state) => state.auth);

  const [level3, setLevel3] = useState(false);
  const [active, setActive] = useState('');
  const [active2, setActive2] = useState('');
  const [active3, setActive3] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(getAdminCategories(token));
    }
  }, [token, dispatch, level3]);

  const handleClickCase1 = (id: any, name: string) => {
    if (id) {
      setLevel3(false);
      dispatch(getCate2(id));
      setActive(id);
    }
  };

  const handleClickCase2 = (id: any, name: string) => {
    if (id) {
      setActive2(id);
      dispatch(getCate3(id));
      setLevel3(true);
    }
  };

  const handleClickCase3 = (id: any, name: string) => {
    setActive3(id);
  };

  return (
    <div>
      <div>
        <h3>Add a new product</h3>
      </div>
      <div>
        <div className="mb-8 flex items-center">
          <label htmlFor="name" className="mr-3">
            Product Name:
          </label>
          <div className="flex-1 h-10 px-3 bg-white rounded border border-gray-100 border-solid">
            <input
              type="text"
              placeholder="Enter product name"
              className="input-styles"
            />
          </div>
        </div>
        <div className="flex justify-start ">
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
      </div>
      <div className="mt-5">
        <Button>Continue</Button>
      </div>
    </div>
  );
}

export default ProductCategory;
