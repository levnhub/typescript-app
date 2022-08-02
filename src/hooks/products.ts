import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
// import { Product } from './components/Product';
// import { products } from './data/products';
import { IProduct } from '../models';

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addProduct = (product: IProduct) => {
    setProducts((prev) => [...prev, product]);
  };

  async function fetchProducts() {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<IProduct[]>(
        'https://fakestoreapi.com/products?limit=5'
      );
      // console.log('response', response);
      setProducts(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, error, loading, addProduct };
}
