import { Container, Grid } from "@material-ui/core";
import React from "react";
import { Group, Categories } from "./components";

export interface ProductsGroupProps {}

export default function ProductsGroup(props: ProductsGroupProps) {
  return (
    <Container maxWidth="lg" style={{ paddingTop: "100px" }}>
      <Grid container spacing={1}>
        <Grid item sm={3}>
          <Categories />
        </Grid>
        <Grid item sm={9}>
          <Group />
        </Grid>
      </Grid>
    </Container>
  );
}
