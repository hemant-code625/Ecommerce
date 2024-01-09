// import process from 'process';
// const VITE_REACT_APP_API_HOST = process.env.SERVER_HOST;
const VITE_REACT_APP_API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;
export const AddToCart = async(items) => {
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/cart`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(items)
  });
  const data = response.json();
  return data;
}

