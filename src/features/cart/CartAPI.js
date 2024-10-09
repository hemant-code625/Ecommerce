const VITE_REACT_APP_API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;

export const AddToCart = async (item) => {
  console.log("item", item);
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data;
};

export const FetchCartByUserId = async (userId) => {
  const response = await fetch(
    `${VITE_REACT_APP_API_HOST}/cart?user=${userId}`
  );
  const data = await response.json();
  return data;
};

export const UpdateCart = async (update) => {
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/cart/${update.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  });
  const data = await response.json();
  return data;
};

export const DeleteCart = async (id) => {
  // why in the url /cart?user={userId} the cart is not getting reset
  // why in the console its showing: CartAPI.js:35 DELETE http://localhost:8080/cart/4 404 (Not Found)
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
export const resetCart = async (userId) => {
  // get the all the orders of that particular user and then delete them in loop
  const cartItems = await FetchCartByUserId(userId);
  // const cartData = cartItems.data;
  for (let item of cartItems) {
    await DeleteCart(item.id);
  }
  return { message: "Cart reset successfully" };
};
