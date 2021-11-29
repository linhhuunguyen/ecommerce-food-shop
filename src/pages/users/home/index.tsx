import Banner from './banner';
import Category from './category';
import Product from './product';
import Slide from './slide';

export default function Home() {
  return (
    <div>
      <Slide />
      <Banner />
      <Category />
      <Product />
    </div>
  );
}
