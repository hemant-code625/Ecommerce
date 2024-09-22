import Home from "./pages/Home.jsx";
import CartPage from "./pages/CartPage.jsx";
import Login from "./pages/LoginPage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import "./index.css";
import Protected from "./features/auth/components/Protected.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PageNotFound from "./pages/PageNotFound.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import Logout from "./features/auth/components/Logout.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin.jsx";
import AdminProductPage from "./pages/AdminProductPage.jsx";
import AdminProductForm from "./pages/AdminProductForm.jsx";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage.jsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchCartByUserIdAsync } from "./features/cart/CartSlice.js";
import { setUser } from "./features/auth/authSlice.js";

const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const user = jwtDecode(localStorage.getItem("token"));
      const userProfile = {
        name: user.name,
        email: user.email,
        imageUrl: user.picture,
        googleId: user.googleId || null,
        addresses: user.addresses,
        role: user.role,
      };
      console.log("user from token: ", userProfile);
      dispatch(fetchCartByUserIdAsync(userProfile.id));
      // save the user in the redux store
      dispatch(setUser(userProfile));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <GoogleOAuthProvider clientId={`${VITE_GOOGLE_CLIENT_ID}`}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <Home />{" "}
                </>
              }
            />
            <Route
              path="/product-detail/:id"
              element={
                <>
                  <ProductDetailPage />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <Protected>
                  <CartPage />{" "}
                </Protected>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/checkout"
              element={
                <Protected>
                  {" "}
                  <Checkout />
                </Protected>
              }
            />
            <Route
              path="/order-success"
              element={
                <Protected>
                  {" "}
                  <OrderSuccessPage />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  {" "}
                  <ProfilePage />
                </Protected>
              }
            />
            <Route
              path="/orders"
              element={
                <Protected>
                  {" "}
                  <OrdersPage />
                </Protected>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <>
                  {" "}
                  <ForgotPasswordPage />
                </>
              }
            />
            <Route
              path="/logout"
              element={
                <Protected>
                  {" "}
                  <Logout />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedAdmin>
                  {" "}
                  <AdminProductPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product-form"
              element={
                <ProtectedAdmin>
                  {" "}
                  <AdminProductForm />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product-form/edit/:id"
              element={
                <ProtectedAdmin>
                  {" "}
                  <AdminProductForm />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product-details/:id"
              element={
                <ProtectedAdmin>
                  {" "}
                  <AdminProductDetailsPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedAdmin>
                  {" "}
                  <AdminOrdersPage />
                </ProtectedAdmin>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
