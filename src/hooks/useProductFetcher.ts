import { useState, useMemo, useCallback } from 'react';
import { BASE_URL, PRODUCTS_PATH } from "utils/config";

export interface Product {
  id: number;
  name: string;
}

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

  const getProducts = useCallback(async (query: string): Promise<void> => {
    debugger;
    setLoading(true);
    try {
      const url = new URL(`${BASE_URL}${PRODUCTS_PATH}`);
      url.searchParams.append()
      const response = await fetch(`?query=${query}`);
      const products = await response.json();
      setData(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(String(error));
    } finally { 
      setLoading(false);
    }
  }, []);

  return useMemo(() => ({ getProducts, loading, products: data, error }), [getProducts, loading, data, error]);
};

export default useProductFetcher;
