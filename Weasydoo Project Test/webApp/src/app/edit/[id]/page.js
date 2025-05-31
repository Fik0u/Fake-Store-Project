"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setTitle(data.title);
                setPrice(data.price);
                setDescription(data.description);
                setCategory(data.category);
                setImage(data.image);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            title,
            price: parseFloat(price),
            description,
            image,
            category,
        };

        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            const data = await res.json();
            console.log("Product updated :", data);
            alert("Product successfully updated !");
            router.push("/");
        } catch (error) {
            console.error("Error :", error);
            alert("Error updating product. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;

return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
        <h1>Modifier le produit</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="electronics">electronics</option>
                <option value="jewelery">jewelery</option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
            </select>
            <button type="submit" style={{ padding: "0.5rem", fontWeight: "bold" }}>
                Save changes
            </button>
        </form>
    </div>
);
}
