"use client"
import { useEffect, useState } from "react";
import { getProducts } from "@/helpers";

const CategoriesFilter = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        const categories = data.products.map(product => product.category);
        const brands = data.products.map(product => product.brand);
        setCategories(categories);
        setBrands(brands);
      } catch (error) {
        console.error("Error fetching categories and brands:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Categories:</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>

      <h2>Brands:</h2>
      <ul>
        {brands.map((brand, index) => (
          <li key={index}>{brand}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesFilter;
