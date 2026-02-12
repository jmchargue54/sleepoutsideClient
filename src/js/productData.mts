import type {Product} from "./types.mts"

const baseURL = import.meta.env.PUBLIC_SERVER_URL;

function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProducts(category = "tents") {
  const res = await fetch(baseURL + `products?category=${category}`);
  const data = await convertToJson(res);
  return data;
}

export async function findProductById(id:string) {
  const response = await fetch(baseURL + `products/${id}`);
  const products = await convertToJson(response);
  console.log(products);
  return products;
}
