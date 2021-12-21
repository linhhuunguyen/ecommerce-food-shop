import { useEffect, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Button from 'components/button';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { RiArrowRightSLine } from 'react-icons/ri';
import {
  getAdminCategories,
  getCate3,
  getCate2
} from 'store/Categories/categories.slice';

import { addNameCategory } from 'store/Products/products.slide';

import './styles.css';

function ProductCategory() {
  interface SelectCategory {
    parent: string;
    name: string;
  }
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { cateloryList, cate2, cate3 } = useAppSelector(
    (state) => state.categories
  );
  const { token } = useAppSelector((state) => state.auth);

  const [level3, setLevel3] = useState(false);
  const [active, setActive] = useState('');
  const [active2, setActive2] = useState('');
  const [active3, setActive3] = useState('');
  const [selectCate1, setSelectCate1] = useState({ parent: '', name: '' });
  const [selectCate2, setSelectCate2] = useState({ parent: '', name: '' });
  const [selectCate3, setSelectCate3] = useState({ parent: '', name: '' });
  const [productName, setProductName] = useState('');

  const selectCategory: SelectCategory[] = [
    selectCate1,
    selectCate2,
    selectCate3
  ];

  const dbCategory = selectCategory
    .filter((item) => item.name !== '')
    .map((item) => item.name);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(getAdminCategories(token));
    }
  }, [token, dispatch, level3]);

  const handleClickCase1 = (id: any, name: string, parent: string) => {
    if (id) {
      setLevel3(false);
      dispatch(getCate2(id));
      setActive(id);
      setSelectCate1({ parent, name });
      setSelectCate2({ parent: '', name: '' });
      setSelectCate3({ parent: '', name: '' });
    }
  };

  const handleClickCase2 = (id: any, name: string, parent: string) => {
    if (id) {
      setActive2(id);
      dispatch(getCate3(id));
      setLevel3(true);
      setSelectCate2({ parent, name });
      setSelectCate3({ parent: '', name: '' });
    }
  };

  const handleClickCase3 = (id: any, name: string, parent: string) => {
    setActive3(id);
    setSelectCate3({ parent, name });
  };

  const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductName(e.target.value);
  };

  const handleContinue = (e: any) => {
    e.preventDefault();
    dispatch(addNameCategory({ productName, dbCategory }));
    history.push('/admin/products/add');
  };

  useEffect(() => {
    if (productName !== '' && selectCategory !== [{ parent: '', name: '' }]) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [productName, selectCate1, selectCate2, selectCate3]);

  return (
    <div>
      <div>
        <h3>Add a new product</h3>
      </div>
      <form>
        <div className="mb-8 flex items-center">
          <label htmlFor="name" className="mr-3">
            Product Name:
          </label>
          <div className="flex-1 h-10 px-3 bg-white rounded border border-gray-100 border-solid">
            <input
              type="text"
              value={productName}
              onChange={handleProductNameChange}
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
                onClick={() =>
                  handleClickCase1(category._id, category.name, category.parent)
                }
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
                  onClick={() =>
                    handleClickCase2(item._id, item.name, item.parent)
                  }
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
                  onClick={() =>
                    handleClickCase3(cate._id, cate.name, cate.parent)
                  }
                >
                  {cate.name}
                  <div>{cate.parent}</div>
                </div>
              ))}
          </div>
        </div>
      </form>
      <div className="flex items-center mt-5">
        <span className="mr-5">Selected:</span>
        <div className="flex items-center cat-selected">
          {selectCategory?.map((category: SelectCategory) => (
            <span
              key={Math.random()}
              className="flex items-center justify-center cat-selected-item"
            >
              {category.name !== '' && (
                <RiArrowRightSLine className="iconArrows mx-1" />
              )}
              {category.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <Button
          disabled={disabled}
          params={disabled ? 'disabled' : ''}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default ProductCategory;
