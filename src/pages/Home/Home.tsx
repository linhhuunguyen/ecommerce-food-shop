import * as React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header/Header/Header";
import Banner from "./components/Banner/Banner";

export interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div>
      <Header />
      <Banner />
      <Footer />
    </div>
  );
}
