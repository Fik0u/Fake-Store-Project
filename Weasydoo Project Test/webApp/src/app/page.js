"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import '@/styles/home.css';


export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://fakestoreapi.com/products');
      const data = await result.json();
      setProducts(data);
      setLoading(false);
    };
    const fetchCategories = async () => {
      const result = await fetch('https://fakestoreapi.com/products/categories');
      const data = await result.json();
      setCategories(data);
    };
    fetchData();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });

      setProducts(products.filter(product => product.id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  if (loading) return <p>Loading products...</p>

  return (
    <div className='home-container'>
      <h1 className='home-title'>Welcome to the Store 🛍️</h1>
      
      {user?.role === 'admin' && (
        <Link href="/add">
          <button className='add-button'>
            Add New Product
          </button>
        </Link>
      )}
      <div className='search-filter'>
        <input 
          type= 'text'
          placeholder='Search products...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
          />

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className='category-select'>
          <option value={"all"}>All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>


      <div className='product-grid'>
        {filteredProducts.map(product => (
          <div key={product.id} className='card'>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p><em>{product.category}</em></p>
            <p><strong>${product.price}</strong></p>

            <div className='card-actions'>
              <div className='card-buttons'>
                <Link href={`/product/${product.id}`}>
                  <button>Details</button>
                </Link>
                {user?.role === 'admin' && (
                  
                    <Link href={`/edit/${product.id}`}>
                      <button>Edit</button>
                    </Link>
                )}
              </div>
              {user?.role === 'admin' && (
                <button onClick={() => handleDelete(product.id)} className='delete-btn'>Delete</button>
              )}
            </div>
          </div>
        ))}
        </div>
    </div>
  );
}
