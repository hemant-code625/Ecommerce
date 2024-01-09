import Navbar from "../features/navbar/Navbar"
import Product from "../features/product/components/ProductList"

const Home = () => {
  return (
    <div>
      <Navbar>
        <Product/>
      </Navbar> 
     
    </div>
  )
}

export default Home
