/* eslint-disable no-async-promise-executor */
// import process from 'process';
// const VITE_REACT_APP_API_HOST = process.env.SERVER_HOST;
import { brands } from "../../../test";
import { products } from "../../../test";

const VITE_REACT_APP_API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    console.log("Fetch All Products: ", products);
    resolve({ products });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      `${VITE_REACT_APP_API_HOST}/products?id=` + id
    );
    const data = await response.json();
    resolve({ data });
  });
}
export const createProduct = async (data) => {
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  console.log("created product: ", res);
  return { res };
};

export const updateProduct = async (update) => {
  try {
    const response = await fetch(
      `${VITE_REACT_APP_API_HOST}/products/${update.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      }
    );
    const res = await response.json();
    console.log("updated product: ", res);
    return { res };
  } catch (error) {
    console.log(error);
  }
};

export function fetchProductsByFilters(filter, sort, pagination) {
  let queryString = "";

  // Handle filters
  if (filter.category && filter.category.length) {
    queryString += `category=${filter.category.join(",")}&`;
  }

  // Handle brand filtering
  if (filter.brand && filter.brand.length) {
    queryString += `brand=${filter.brand.join(",")}&`;
  }

  // Handle sorting
  if (sort._sort && sort._order) {
    queryString += `_sort=${sort._sort}&_order=${sort._order}&`;
  }

  // Handle pagination
  if (pagination._page && pagination._limit) {
    queryString += `_page=${pagination._page}&_limit=${pagination._limit}&`;
  }

  // Remove the trailing '&' if present
  if (queryString.endsWith("&")) {
    queryString = queryString.slice(0, -1);
  }

  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?${queryString}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const totalItems = response.headers.get("X-Total-Count");
      resolve({ data: { products: data, totalItems: +totalItems } });
    } catch (error) {
      console.error("Error fetching products:", error);
      resolve({ data: { products: [], totalItems: 0 }, error: error.message });
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://dummyjson.com/products/category-list"
    );
    const res = await response.json();
    const capitalizedCategories = res.map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1)
    );

    const data = capitalizedCategories;
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    // const response = await fetch(`${VITE_REACT_APP_API_HOST}/brands`);
    // const data = await response.json();
    const data = brands;
    resolve({ data });
  });
}
