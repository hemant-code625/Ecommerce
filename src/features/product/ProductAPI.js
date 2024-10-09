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
  return new Promise(async () => {
    const idNum = parseInt(id);
    try {
      const response = await fetch(`https://dummyjson.com/products/${idNum}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        data: {
          products: data,
        },
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      return {
        data: { products: [] },
        error: error.message,
      };
    }
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

export async function fetchProductsByFilters(filter, sort, pagination) {
  let queryString = new URLSearchParams();

  // Handle filters
  if (filter.category && filter.category.length) {
    queryString.append("category", filter.category.join(","));
  }
  if (filter.brand && filter.brand.length) {
    queryString.append("brand", filter.brand.join(","));
  }

  // Handle sorting
  if (sort._sort && sort._order) {
    queryString.append("_sort", sort._sort);
    queryString.append("_order", sort._order);
  }

  // Handle pagination
  const page = pagination._page || 1;
  const limit = pagination._limit || 10;
  queryString.append("skip", ((page - 1) * limit).toString());
  queryString.append("limit", limit.toString());

  try {
    const response = await fetch(
      `https://dummyjson.com/products?${queryString}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const totalItems = data.total;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: {
        products: data,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      data: { products: [], totalItems: 0, totalPages: 0, currentPage: 1 },
      error: error.message,
    };
  }
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
