import React from 'react';
import ProductDetailsComponent from '../components/product-details';

export default function ProductDetails({
  match: {
    params: { id }
  }
}) {
  return (
    <div>
      <ProductDetailsComponent productId={id} />
    </div>
  );
}
