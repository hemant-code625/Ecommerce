import { useEffect } from "react";
import { selectOrders } from "../orderSlice";
import { Link } from "react-router-dom";

import { resetCartAsync } from "../../cart/CartSlice";
import {selectLoggedInUser} from "../../auth/authSlice"
import { useSelector, useDispatch } from 'react-redux';
import { discountedPrice } from "../../../app/constants";

const Order = () => {
  const orders = useSelector(selectOrders);
  const products = orders.currentOrder.products;
  const address = orders.currentOrder.address;
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch();
  console.log(orders);
  useEffect(()=>{
    dispatch(resetCartAsync(user.id))
  })
  return (
    <div>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center w-3/4">
          <p className="text-base font-semibold text-indigo-600">
            Order PLaced Successfuly!
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order #{orders.currentOrder.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your all orders in My Accounts &gt; My Orders{" "}
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Status: {orders.currentOrder.status}
          </p>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.href}>{product.title}</a>
                            </h3>
                            <p className="ml-4"> ₹ {discountedPrice(product)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty : {product.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between px-4 text-base font-medium text-gray-900">
                <p>Billing Amount : ₹ {orders.currentOrder.totalAmount}</p>
                <p>Payment Method: {orders.currentOrder.payment}</p>
              </div>
            </div>
          </div>

          <li className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  Name: {address.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  Street: {address.street}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  Pincode: {address.pinCode}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                Phone: {address.phone}
              </p>
              <p className="text-sm leading-6 text-gray-500">
                City: {address.city}
              </p>
            </div>
          </li>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              replace={true}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link
              to={"/contact-us"}
              className="text-sm font-semibold text-gray-900"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Order;
