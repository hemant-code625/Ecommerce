/* eslint-disable no-async-promise-executor */
// import process from 'process';
// const VITE_REACT_APP_API_HOST = process.env.SERVER_HOST;
const VITE_REACT_APP_API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/products`) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/products/`+id) 
    const data = await response.json()
    resolve({data})
  }
  );
}
export const createProduct = async(data)=>{
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/products`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })
  const res = await response.json();
  console.log("created product: ", res);
  return {res};
}

export const updateProduct = async( update)=>{
  try {
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/products/${update.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(update)
    })
    const res = await response.json();
    console.log("updated product: ", res);
    return {res};
  } catch (error) {
    console.log(error);
  }
}
export function fetchProductsByFilters(filter,sort,pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10} 
  // TODO : on server we will support multi values in filter
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }


  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/products?`+queryString) 
    const data = await response.json()
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({data:{products:data,totalItems:+totalItems}})
  }
  );
}


export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/categories`) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/brands`) 
    const data = await response.json()
    resolve({data})
  }
  );
}