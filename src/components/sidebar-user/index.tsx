import { NavLink } from 'react-router-dom';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { sidebarUserItems } from './sidebar.user-constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleStyle: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#161f6a',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '20px 55px 20px 30px'
    },
    nameStyle: {
      paddingLeft: '15px'
    },
    menuList: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginTop: '6rem !important'
    },
    menuItem: {
      padding: 0,
      '& a': {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '1rem',
        color: '#161f6a',
        '& svg': {
          marginRight: '1rem'
        }
      }
    }
  })
);

export default function SidebarUser() {
  const classes = useStyles();

  function renderSidebarItems(items: typeof sidebarUserItems) {
    return items.map((item) => (
      <MenuItem className={classes.menuItem} key={item.to}>
        <NavLink
          exact
          activeClassName="active-links"
          className={classes.titleStyle}
          to={item.to}
        >
          {item.icon} {item.name}
        </NavLink>
      </MenuItem>
    ));
  }

  return (
    <>
      <MenuList className={classes.menuList}>
        {renderSidebarItems(sidebarUserItems)}
      </MenuList>
    </>
  );
}
