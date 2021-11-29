import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  titles: {
    fontSize: '2rem',
    color: '#192a56',
    fontWeight: 500
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer style={{ marginTop: '30px' }}>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="#fff"
        color="#333"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box className={classes.titles}>Locations</Box>
              <Box>
                <Link href="/" color="inherit">
                  India
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Vietnams
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  USA
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className={classes.titles}>Contact Info</Box>
              <Box>
                <Link href="/" color="inherit">
                  +123-456-7890
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  +111-222-3333
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  shaikhanas@gmail.com
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className={classes.titles}>Follow Us</Box>
              <Box>
                <Link href="/" color="inherit">
                  Facebook
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Youtube
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Instagram
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Food Workshop &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
