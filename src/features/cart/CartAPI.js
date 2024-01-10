const VITE_REACT_APP_API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;

export const AddToCart = async(items) => {
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/cart`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(items)
  });
  const data = await response.json();
  return data;
}

export const FetchCartByUserId = async(userId) => {
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/cart?userId=${userId}`);
  const data = await response.json();
  console.log(data)
  return data;
}

export const UpdateCart = async(update) => {
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/cart/${update.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(update)
  });
  const data = await response.json();
  return data;
}