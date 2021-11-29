import { useHistory } from 'react-router-dom';
import { TopBox } from 'components/FormsUI';
import ProductListTable from './list';

const ProductList = () => {
  const history = useHistory();

  return (
    <>
      <TopBox
        title="Products"
        nameButton="Add Product"
        handle={() => history.push('products/add')}
      />
      <ProductListTable />
    </>
  );
};

export default ProductList;
