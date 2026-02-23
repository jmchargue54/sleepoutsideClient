const baseURL = import.meta.env.PUBLIC_SERVER_URL;

function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
export function getData(category:string) {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function getProducts(category:string) {
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
