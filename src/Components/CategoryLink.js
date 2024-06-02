// src/components/CategoryLink.js

import React from 'react';
import { Link } from 'react-router-dom';

const CategoryLink = ({ category, onCategoryClick }) => {
  return (
    <Link
      to="#"
      onClick={() => onCategoryClick(category.id)}
      className="relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
    >
      {category.name}
    </Link>
  );
};

export default CategoryLink;
