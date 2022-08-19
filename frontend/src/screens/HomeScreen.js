import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;


  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    <div>
      <h2 style={{fontSize:'25px'}}>Latest Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
