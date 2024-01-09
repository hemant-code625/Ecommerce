import Home from './pages/Home.jsx'
import CartPage from './pages/CartPage.jsx'
import Login from './pages/LoginPage.jsx'
import SignUp from './pages/SignUpPage.jsx'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Checkout from './pages/Checkout.jsx'
import './index.css'
import Protected from './features/auth/components/Protected.jsx'

function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Protected > <Home/> </Protected> } /> 
          <Route path='/cart' element={<Protected ><CartPage/> </Protected>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/product-detail/:id' element={<Protected ><ProductDetailPage/></Protected>} />
          <Route path='/checkout' element={<Protected> <Checkout/></Protected>} />
          <Route path='*' element={<h1 className='pageNotFound'>4 Oh! 4 <h2>Not Found</h2></h1>} />
           {/* <Route path='/' element={< > <Home/> </> } /> 
          <Route path='/cart' element={< ><CartPage/> </>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/product-detail/:id' element={< ><ProductDetailPage/></>} />
          <Route path='/checkout' element={<> <Checkout/></>} />
          <Route path='*' element={<h1 className='pageNotFound'>4 Oh! 4 <h2>Not Found</h2></h1>} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
