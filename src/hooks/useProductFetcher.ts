import { useState, useCallback } from 'react';
import { BASE_URL, PRODUCTS_PATH } from 'utils/config';
import type { Product } from 'utils/types';

interface ReturnProps {
  getProducts: (query: string) => Promise<void>
  setLoading: (value: boolean) => void
  loading: boolean
  products: Product[]
  error?: string
};

const useProductFetcher = (): ReturnProps => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string>();

  const getProducts = useCallback(async (query: string, limit = '8'): Promise<void> => {
    if (!query) {
      setData([]);
      return;
    }

    const url = new URL(`${BASE_URL}${PRODUCTS_PATH}`);
    url.searchParams.append('search', query);
    url.searchParams.append('p', '1');
    url.searchParams.append('limit', limit);

    try {
      setLoading(true);
      const response = await fetch(url.toString());
      const products = await response.json();
      setData(products);
      setError('');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching products:', error);
      setError(String(error));
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getProducts, setLoading, loading, products: data, error };
};

export default useProductFetcher;
