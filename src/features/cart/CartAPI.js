
export const AddToCart = async(items) => {
  const response = await fetch('http://localhost:3000/cart',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(items)
  });
  const data = response.json();
  return data;
}

