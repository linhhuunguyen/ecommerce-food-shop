import Container from '@mui/material/Container';
import CategoryListTable from 'modules/admin/category/list';
import { useHistory } from 'react-router-dom';
import { TopBox } from 'components/FormsUI';

export default function CategoryList() {
  const history = useHistory();

  return (
    <>
      <TopBox
        title="Category"
        nameButton="Add Category"
        handle={() => history.push('category/add')}
      />

      <CategoryListTable />
    </>
  );
}
