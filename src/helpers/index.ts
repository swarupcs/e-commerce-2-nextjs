import { productData } from "@/constants/data";

export const getProducts = async () => {
    // const res = await fetch("https://fakestoreapiserver.reactbd.com/smart");
    // const res = await fetch("http://localhost:3000/api/products");
    const res = await fetch("https://dummyjson.com/products?limit=10");
    if (!res.ok) {
      throw new Error("Faild to fetch products");
    }
    return res.json();
  };



  // export const getTrendingProducts = async () => {
  //   const res = await fetch(
  //     "https://fakestoreapiserver.reactbd.com/smarttrending"
  //   );
  //   if (!res.ok) {
  //     throw new Error("Faild to fetch products");
  //   }
  //   return res.json();
  // };


  export const calculatePercentage = (oldPrice: any, price: any) => {
    return !!parseFloat(price) && !!parseFloat(oldPrice)
      ? (100 - (oldPrice / price) * 100).toFixed(0)
      : 0;
  };

  export const getSingleProudct = async (_id: number) => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=10");
      if (!res.ok) {
        throw new Error("Failed to fetch product list");
      }
      const productData = await res.json(); // Extract JSON data from response
      console.log(productData); // Log the product list
      const item = productData.products.find((product: any) => product.id === _id); // Find the product by _id
      return item;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null; // Return null if there's an error
    }
  };
  