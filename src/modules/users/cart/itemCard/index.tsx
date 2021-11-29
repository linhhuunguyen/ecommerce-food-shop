import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';

import { CartItem } from 'types/Cart';
import { useStyles } from './item-card.styles';

interface CartItemCardProps {
  item: CartItem;
  deleteCartItems: () => void;
}

const CartItemCard = ({ item, deleteCartItems }: CartItemCardProps) => {
  const { name, price } = useStyles();

  return (
    <>
      <Grid item sm={2}>
        <img src={item.images} alt={item.name} width="100%" />
      </Grid>
      <Grid item sm={5} className={name}>
        <Link to={`/products/${item.id}`}>{item.name}</Link>
        <Button onClick={deleteCartItems}>Remove</Button>
      </Grid>
      <Grid item sm={1} className={price}>
        {item.price}
      </Grid>
    </>
  );
};

export default CartItemCard;
