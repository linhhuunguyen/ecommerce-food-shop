import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export default function SmallBanner() {
  return (
    <Container maxWidth="lg" style={{ padding: '90px 0' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} spacing={2}>
          <Box>
            <img
              src="	https://shop-redq.vercel.app/_next/static/images/offer-2-90d3534e1ad62a8b8a977f1290e61e9f.png"
              alt=""
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} spacing={2}>
          <Box>
            <img
              src="	https://shop-redq.vercel.app/_next/static/images/offer-3-2f8285b13bef950f843cb4147666af6e.png"
              alt=""
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} spacing={2}>
          <Box>
            <img
              src="https://shop-redq.vercel.app/_next/static/images/offer-1-1f7a4c9ea0ba5a216bc7af1f60d044e0.png"
              alt=""
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
