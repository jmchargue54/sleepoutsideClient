import type {Product} from "./types.mts"

const baseURL = import.meta.env.PUBLIC_SERVER_URL;

function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getProducts(category:string) {
  console.log ("baseURL:", baseURL);
  return fetch(baseURL + `product-list/index.html?category=${category}`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id:string) {
  const response = await fetch(baseURL + `product-list/index.html?${id}`);
  const products = await convertToJson(response) as Product;
  console.log(products);
  return products;
}
