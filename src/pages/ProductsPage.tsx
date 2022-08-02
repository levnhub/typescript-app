import React, { useContext } from 'react';
import CreateProduct from '../components/CreateProduct';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { Product } from '../components/Product';
import { ModalContext } from '../context/ModalContext';
import { useProducts } from '../hooks/products';
import { IProduct } from '../models';

const ProductsPage = () => {
  const { loading, error, products, addProduct } = useProducts();
  // const [modal, setModal] = useState(true); // used context below
  const { modal, open, close } = useContext(ModalContext);

  const onCreateHandler = (product: IProduct) => {
    addProduct(product);
    close();
  };

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map((product: IProduct) => (
        <Product product={product} key={product.id} />
      ))}

      {modal && (
        <Modal title="Create new product" onClose={close}>
          <CreateProduct onCreate={onCreateHandler} />
        </Modal>
      )}

      <button
        className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-5 pb-3 pt-2"
        onClick={open}
      >
        +
      </button>
    </div>
  );
};

export default ProductsPage;
