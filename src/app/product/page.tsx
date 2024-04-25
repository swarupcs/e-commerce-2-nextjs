"use client";

import React, { useEffect, useState } from 'react';
import Container from "@/components/Container";
import { getSingleProudct } from "@/helpers";
import SingleProduct from "@/components/SingleProduct";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ProductPage = ({ searchParams }: Props) => {
  const [product, setProduct] = useState<Products | null>(null); // State to store product details

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const _idString = searchParams?.id;
        const _id = Number(_idString);
        const productData = await getSingleProudct(_id);
        setProduct(productData); // Set product data to state
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [searchParams]); // Fetch product whenever searchParams changes

  return (
    <Container>
      {product && <SingleProduct product={product} />} {/* Render SingleProduct component with product details */}
    </Container>
  );
};

export default ProductPage;

