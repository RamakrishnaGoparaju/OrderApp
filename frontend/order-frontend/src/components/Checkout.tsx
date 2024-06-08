import React from 'react';

const Checkout = ({ order }: { order: any }) => {
  return (
    <div>
      <h2>Order Summary</h2>
      <p>Name: {order.customerName}</p>
      <p>Email: {order.email}</p>
      <p>Mobile: {order.mobileNumber}</p>
      <p>Address: {order.address}</p>
      <h3>Products</h3>
      <ul>
        {order.products.map((product: any, index: number) => (
          <li key={index}>
            {product.name} - {product.quantity} x ${product.price}
          </li>
        ))}
      </ul>
      <h3>Total: ${order.products.reduce((total: number, product: any) => total + product.quantity * product.price, 0)}</h3>
    </div>
  );
};

export default Checkout;
