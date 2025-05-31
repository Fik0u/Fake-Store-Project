"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import '@/styles/prodDetails.css';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
            setProduct(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="product-container">
            <div className="product-image-section">
                <img src={product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-details-section">
                <h1 className="product-title">{product.title}</h1>
                <div className="product-info">
                    <p><strong>Price :</strong> ${product.price}</p>
                    <p><strong>Category :</strong> {product.category}</p>
                    <p><strong>Description :</strong> {product.description}</p>
                    <p><strong>Rate :</strong> ⭐ {product.rating?.rate} /5</p>
                    <p><strong>Reviews :</strong> {product.rating?.count}</p>
                </div>
            </div>
        </div>
    );
}
