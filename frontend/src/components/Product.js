import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium-img" src={`http://localhost:3000/uploads/${product.image}`} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}  style={{color:'black'}} >
          <h2 className='text-hover' >{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="price" style={{color:'dodgerblue',marginTop:'9px'}}>${product.price}</div>
          
        </div>
      </div>
    </div>
  );
}
