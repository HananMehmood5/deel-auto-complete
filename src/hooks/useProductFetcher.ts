import { useState, useCallback } from 'react';
import { BASE_URL, PRODUCTS_PATH } from "utils/config";
import type { Product } from "utils/types"

type ReturnProps = {
  getProducts: (query: string) => Promise<void>;
  loading: boolean;
  products: Product[];
  error?: string;
}

const useProductFetcher = (): ReturnProps => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string>();

  const getProducts = useCallback(async (query: string, limit = '8'): Promise<void> => {
    if (!query) {
      return
    }
    const url = new URL(`${BASE_URL}${PRODUCTS_PATH}`);
    url.searchParams.append("search", query);
    url.searchParams.append("p", '1');
    url.searchParams.append("limit", limit);
    try {
      setLoading(true);
      const response = await fetch(url.toString());
      const products = await response.json();
      setData(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(String(error));
    } finally { 
      setLoading(false);
    }
  }, []);

  return { getProducts, loading, products: data, error };
};

export default useProductFetcher;
