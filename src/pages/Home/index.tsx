import React from "react";
import { Categories, Slide, Products, SmallBanner } from "./components";

export interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div>
      <Slide />
      <SmallBanner />
      <Categories />
      <Products />
    </div>
  );
}
