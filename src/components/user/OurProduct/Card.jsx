import axiosInstance from '../../../utils/axiosInstance';
import React, { useEffect, useState } from 'react';

const Card = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/products/catagory?category=keycap');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching keycap products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {products.map(product => (
                <div key={product._id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Card;
