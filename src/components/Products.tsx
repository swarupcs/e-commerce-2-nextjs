"use client"
import React, { useEffect, useState } from 'react';
import Container from "./Container";
import ProductsData from "./ProductsData";
import { Products } from "../../type";
import { getProducts } from "@/helpers";
import CategoriesFilter from './CategoriesFilter';

const ProductsPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
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

  // Calculate index of the first and last product for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 -mt-10">
      <div className="col-span-1">
        <CategoriesFilter />
      </div>
      <div className="col-span-1 md:col-span-2 xl:col-span-3">
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {currentProducts.map((item: Products) => (
            <ProductsData item={item} key={item?.id} />
          ))}
        </div>
        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-2 px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductsPage;




