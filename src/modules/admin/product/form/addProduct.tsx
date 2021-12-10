import { useMemo, useEffect, useState, ChangeEvent } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from 'store/hook';
import {
  addProduct,
  getProduct,
  updateProduct
} from 'store/Products/products.slide';

import { getCategories } from 'store/Categories/categories.slice';
import { Category } from 'types/Category';
import { Product } from 'types/Product';

interface ProductAddFormProps {
  mode: 'create' | 'edit';
}

const ProductAddForm = ({ mode }: ProductAddFormProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [price, setPrice] = useState<any>(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [Stock, setStock] = useState<any>(0);
  const [images, setImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);

  const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'SmartPhones'
  ];

  const { productDetail, loading } = useAppSelector((state) => state.products);
  const { cateloryList } = useAppSelector((state) => state.categories);
  const { token } = useAppSelector((state) => state.auth);

  const { id } = useParams<{ id: string }>();
  //   const initialValues = useMemo(() => {
  //     if (mode === 'edit') {
  //       return {
  //         _id: productDetail._id,
  //         name: productDetail.name,
  //         description: productDetail.description,
  //         price: productDetail.price,
  //         ratings: productDetail.ratings,
  //         images: productDetail.images,
  //         category: productDetail.category,
  //         stock: productDetail.stock,
  //         numOfReviews: productDetail.numOfReviews,
  //         reviews: productDetail.reviews,
  //         createAt: productDetail.createAt
  //       };
  //     }

  //     return {
  //       name: '',
  //       description: '',
  //       price: 0,
  //       ratings: 0,
  //       category: '',
  //       stock: 0,
  //       numOfReviews: 0,
  //       createAt: ''
  //     };
  //   }, [productDetail, mode]);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
    dispatch(getCategories());
  }, [id, dispatch, token]);

  function handleSubmit(e: any) {
    e.preventDefault();
    const product = new FormData();
    product.set('name', name);
    product.set('price', price);
    product.set('description', description);
    product.set('category', category);
    product.set('Stock', Stock);

    images.forEach((image: any) => {
      product.append('images', image);
    });

    const data = { product, token };
    // dispatch(addProduct(data));
    console.log('dataaaaaaaaaaaaaaaaaaaaaa', product);
    // history.push('/admin/products');
  }

  const createProductImagesChange = (e: any) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old: any) => [...old, reader.result]);
          setImages([...images, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDestroy = () => {
    setImages([]);
    setImagesPreview([]);
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Product Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          placeholder="Price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Name</label>
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">Choose Category</option>
          {categories.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="Stock">Stock</label>
        <input
          type="number"
          placeholder="Stock"
          required
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <div id="createProductFormFile">
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={createProductImagesChange}
          multiple
        />
      </div>

      <div id="createProductFormImage">
        {imagesPreview.map((image: any) => (
          <img key={Math.random()} src={image} alt="Product Preview" />
        ))}
      </div>
      <button type="submit">Add Product</button>
      <button type="submit" onClick={handleDestroy}>
        xóa
      </button>
    </form>
  );
};

export default ProductAddForm;
