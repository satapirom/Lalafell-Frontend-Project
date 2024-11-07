import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '../../../services/productServices';
import ProductCard from '../Products/ProductCard';

const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            fetchSearchResults(searchQuery);
        }
    }, [searchParams]);

    const fetchSearchResults = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const results = await searchProducts(query);
            setProducts(results);
        } catch (err) {
            setError('Failed to fetch search results. Please try again.');
            console.error('Error fetching search results:', err);
        } finally {
            setLoading(false);
        }
    };



    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color mx-auto"></div>
                    <p className="mt-4 text-gray-600">Searching for magical items...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-600">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">No Results Found</h2>
                    <p className="text-gray-600">Try adjusting your search terms or browse our categories.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container max-w-screen-laptopl mx-auto mt-20 px-4 py-8 custom-bg tablet:rounded-lg overflow-hidden">
            <h1 className="text-xl tablet:text-2xl font-semibold text-gray-800 mb-6">
                Search Results for: <span className="text-primary-color">${searchParams.get('search')}</span>
            </h1>
            <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4 overflow-hidden">
                {products.map((product) => (
                    <div key={product._id} className="w-full">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );

};

export default SearchResultPage;