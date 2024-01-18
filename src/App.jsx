import Home from './pages/Home.jsx'
import CartPage from './pages/CartPage.jsx'
import Login from './pages/LoginPage.jsx'
import SignUp from './pages/SignUpPage.jsx'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Checkout from './pages/Checkout.jsx'
import './index.css'
import Protected from './features/auth/components/Protected.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import PageNotFound from './pages/PageNotFound.jsx'
import OrderSuccessPage from './pages/OrderSuccessPage.jsx'
const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <>
    <GoogleOAuthProvider clientId={`${VITE_GOOGLE_CLIENT_ID}`}>
      <Router>
        <Routes>
          <Route path='/' element={<Protected > <Home/> </Protected> } /> 
          <Route path='/cart' element={<Protected ><CartPage/> </Protected>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/product-detail/:id' element={<Protected ><ProductDetailPage/></Protected>} />
          <Route path='/checkout' element={<Protected> <Checkout/></Protected>} />
          <Route path='/order-success' element={<Protected> <OrderSuccessPage/></Protected>} />
          <Route path='*' element={ <PageNotFound/> } />
        </Routes>
      </Router>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
