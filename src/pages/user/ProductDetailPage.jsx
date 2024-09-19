import React from 'react'
import ProductDetail from '../../components/user/ProductDetail/ProductDetail';

const ProductDetailPage = () => {
    const product = {
        name: "Example Product",
        price: 1999,
        description: "This is a detailed description of the example product.",
        images: [
            { url: "https://example.com/image1.jpg" },
            { url: "https://example.com/image2.jpg" },
        ],
        comments: [
            { text: "Great product!", rating: 5 },
            { text: "Good value for money", rating: 4 },
        ]
    };

    return (
        <div className="App">
            <ProductDetail product={product} />
        </div>
    )
}

export default ProductDetailPage