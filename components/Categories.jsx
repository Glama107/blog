import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl dark:text-white mb-8 font-semibold border-b pb-4">
        Catégories
      </h3>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span
            className={`transition ease  cursor-pointer dark:text-gray-400 block dark:hover:text-white ${
              index === categories.length - 1 ? "border-b-0" : "border-b"
            } pb-3 mb-3`}
          >
            {category.nom}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
