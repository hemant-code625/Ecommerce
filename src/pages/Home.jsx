/* eslint-disable no-unused-vars */

import Navbar from "../features/navbar/Navbar";
import Product from "../features/product/components/ProductList";
import Footer from "../features/common/Footer.jsx";

const Home = () => {
  return (
    <>
      {/* create a new customized Navbar */}
      <Navbar>
        <Product />
      </Navbar>
      <Footer />
    </>
  );
};

export default Home;
