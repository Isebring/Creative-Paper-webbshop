import { useEffect, useState } from 'react';
import { Category } from '../components/CategoryFilter';

const useCategories = (): Category[] => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((response) => response.json())
      .then(setCategories);
  }, []);

  return categories;
};

export default useCategories;
