"use client"

import React, { useEffect, useState } from 'react';
import Container from "./Container";
import ProductsData from "./ProductsData";
import { Products } from "../../type";
import { getProducts } from "@/helpers";
import CategoriesFilter from './CategoriesFilter';

const ProductsPage = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        // Assuming productsData has a 'products' array
        const productsWithQuantity = productsData.products.map((product: Products) => ({
          ...product,
          quantity: 1
        }));
        setProducts(productsWithQuantity);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 -mt-10">
      <CategoriesFilter/>
      {products.map((item: Products) => (
        <ProductsData item={item} key={item?.id} />
      ))}
    </Container>
  );
};

export default ProductsPage;

