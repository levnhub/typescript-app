import axios from 'axios';
import React, { useState } from 'react';
import { IProduct } from '../models';
import ErrorMessage from './ErrorMessage';

const productData: IProduct = {
  title: 'test product',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 42,
    count: 10,
  },
};

interface CreateProductProps {
  onCreate: (product: IProduct) => void;
}

const CreateProduct = ({ onCreate }: CreateProductProps) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (value.trim().length === 0) {
      setError('Please enter valid title.');
      return;
    }

    productData.title = value;
    const response = await axios.post<IProduct>(
      'https://fakestoreapi.com/products',
      productData
    );

    onCreate(response.data);
  };

  const onChangeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product title..."
        value={value}
        onChange={onChangeHandler}
      />
      {error && <ErrorMessage error={error} />}
      <button
        type="submit"
        className="py-2 px-4 border bg-yellow-400 hover:bg-yellow-300"
      >
        Create
      </button>
    </form>
  );
};

export default CreateProduct;
