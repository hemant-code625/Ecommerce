const VITE_REACT_APP_API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;

export const AddToCart = async(item) => {
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/cart`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    return data;
  
}

export const FetchCartByUserId = async(userId) => {
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/cart?user=${userId}`);
  const data = await response.json();
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

export const DeleteCart = async(id) => {
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/cart/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}