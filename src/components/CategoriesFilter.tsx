"use client"
import { useEffect, useState } from "react";
import { getProducts } from "@/helpers";

const CategoriesFilter = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        const uniqueCategories = [...new Set(data.products.map(product => product.category))];
        const uniqueBrands = [...new Set(data.products.map(product => product.brand))];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching categories and brands:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle category checkbox change
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Function to handle brand checkbox change
  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Categories:</h2>
      <ul className="divide-y divide-gray-200">
        {categories.map((category, index) => (
          <li key={index} className="py-2">
            <input
              type="checkbox"
              id={`category-${index}`}
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={`category-${index}`} className="ml-2">{category}</label>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">Brands:</h2>
      <ul className="divide-y divide-gray-200">
        {brands.map((brand, index) => (
          <li key={index} className="py-2">
            <input
              type="checkbox"
              id={`brand-${index}`}
              value={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            <label htmlFor={`brand-${index}`} className="ml-2">{brand}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesFilter;
