import React, { useState } from 'react';
import axios from 'axios';

interface Product {
  name: string;
  quantity: number;
  price: number;
}

const OrderForm = ({ onCheckout }: { onCheckout: (order: any) => void }) => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [products, setProducts] = useState<Product[]>([{ name: '', quantity: 1, price: 0 }]);

  const handleProductChange = (index: number, field: string, value: string | number) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', quantity: 1, price: 0 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order = { customerName, email, mobileNumber, address, products };
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/order', order, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onCheckout(order);
    } catch (error) {
      console.error('Failed to submit order', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      {products.map((product, index) => (
        <div key={index}>
          <input type="text" placeholder="Product Name" value={product.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)} required />
          <input type="number" placeholder="Quantity" value={product.quantity} onChange={(e) => handleProductChange(index, 'quantity', +e.target.value)} required />
          <input type="number" placeholder="Price" value={product.price} onChange={(e) => handleProductChange(index, 'price', +e.target.value)} required />
        </div>
      ))}
      <button type="button" onClick={handleAddProduct}>Add Product</button>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderForm;
