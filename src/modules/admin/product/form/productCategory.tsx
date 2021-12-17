import { useEffect, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { IoIosArrowForward } from 'react-icons/io';
import Button from 'components/button';
import { useAppSelector, useAppDispatch } from 'store/hook';
import {
  getAdminCategories,
  getCate3,
  getCate2
} from 'store/Categories/categories.slice';

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
  const [productName, setProductName] = useState('');
  const [selectCategory, setSelectCategory] = useState<SelectCategory[]>([]);

  // const allCategory = [categoryName, categoryName2, categoryName3];
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
      setSelectCategory([{ parent, name }]);
    }
  };

  const handleClickCase2 = (id: any, name: string, parent: string) => {
    if (id) {
      setActive2(id);
      dispatch(getCate3(id));
      setLevel3(true);
      // selectCategory.filter((item) => {
      //   if (item.parent === parent) {
      //     setSelectCategory([
      //       ...selectCategory,
      //       (selectCategory[1] = { parent, name })
      //     ]);
      //   } else {
      //     setSelectCategory([...selectCategory, { parent, name }]);
      //   }
      // });
      for (let i = 0; i < selectCategory.length; i++) {
        if (selectCategory[i].parent !== parent) {
          setSelectCategory([...selectCategory, { parent, name }]);
        } else {
          selectCategory[1].name = name;
          return selectCategory;
        }
      }
    }
  };

  const handleClickCase3 = (id: any, name: string, parent: string) => {
    setActive3(id);
    selectCategory.filter((item) =>
      item.parent === parent
        ? setSelectCategory([...selectCategory])
        : setSelectCategory([...selectCategory, { parent, name }])
    );
  };

  const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductName(e.target.value);
  };

  const handleContinue = (e: any) => {
    e.preventDefault();
    history.push('/admin/products/add');
  };

  useEffect(() => {
    if (productName !== '' && selectCategory !== [{ parent: '', name: '' }]) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [productName, selectCategory]);

  console.log(selectCategory);

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
                  <div>{item.parent}</div>
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
      <div className="flex items-center mt-5 cat-selected">
        <span className="mr-5">Selected:</span>
        {selectCategory?.map((category: SelectCategory) => (
          <span
            key={Math.random()}
            className="cat-selected-item flex items-center mx-3"
          >
            {category.name}
          </span>
        ))}
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
