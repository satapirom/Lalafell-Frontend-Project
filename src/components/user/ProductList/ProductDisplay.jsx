import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import axiosInstance from '../../../utils/axiosInstance';
import useToggle from '../../../hooks/user/useToggle';
import SortBy from './SortBy';
import SizeFilter from './SizeFilter';
import CategoryFilter from './CatagoryFilter';

const ProductDisplay = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('price');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const { isOpen: isSizeOpen, toggle: toggleSize, onClose: onCloseSize } = useToggle();
    const { isOpen: isCategoryOpen, toggle: toggleCategory, onClose: onCloseCategory } = useToggle();

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('search') || '';

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            console.log(`Fetching products with sort: ${sortOption}, size: ${selectedSize}, category: ${selectedCategory}, search: ${searchQuery}`);
            const response = await axiosInstance.get(`/products`, {
                params: {
                    size: selectedSize,
                    category: selectedCategory,
                    search: searchQuery
                }
            });
            const fetchedProducts = response.data.products;
            console.log('Fetched products:', fetchedProducts);
            if (!Array.isArray(fetchedProducts)) {
                throw new Error('Products is not an array');
            }
            setProducts(fetchedProducts);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [selectedSize, selectedCategory, sortOption, searchQuery]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSortChange = (newSortOption) => {
        console.log('Changing sort option to:', newSortOption);
        setSortOption(newSortOption);
    };

    const handleSizeSelect = (size) => {
        console.log('selectedSize:', size);
        setSelectedSize(size);
    };

    const handleCategorySelect = (category) => {
        console.log('selectedCategory:', category);
        setSelectedCategory(category);
    };

    const sortedAndFilteredProducts = useMemo(() => {
        const filtered = products
            .filter(product => selectedSize === '' || product.size === selectedSize)
            .filter(product => selectedCategory === '' || product.category === selectedCategory);

        const sortByOption = (a, b) => {
            switch (sortOption) {
                case 'price':
                    return a.price - b.price;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'rating':
                    return b.rating - a.rating; // Assuming higher rating is better
                default:
                    return 0;
            }
        };

        return filtered.slice().sort(sortByOption);
    }, [products, selectedSize, selectedCategory, sortOption]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6 relative">
            <div className='flex justify-between items-center mb-2'>
                <h4 className="text-xl font-semibold">Products ({sortedAndFilteredProducts.length})</h4>
                <div className="flex space-x-4 items-center">
                    <CategoryFilter
                        isSizeOpen={isCategoryOpen}
                        toggleSize={toggleCategory}
                        handleCategorySelect={handleCategorySelect}
                        selectedCategory={selectedCategory}
                        onClose={onCloseCategory}
                    />
                    <SizeFilter
                        isSizeOpen={isSizeOpen}
                        toggleSize={toggleSize}
                        handleSizeSelect={handleSizeSelect}
                        selectedSize={selectedSize}
                        onClose={onCloseSize}
                    />
                    <SortBy
                        setSortOption={handleSortChange}
                        sortOption={sortOption}
                    />
                </div>
            </div>
            {sortedAndFilteredProducts.length > 0 ? (
                <div className="flex flex-wrap justify-between">
                    {sortedAndFilteredProducts.map((product) => (
                        <div className="w-full tablet:w-1/4 p-2" key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <img
                        className="mx-auto w-10 mt-10"
                        src='../images/emoticon.png'>
                    </img>
                    <h4 className="text-lg text-center text-gray-700 mt-4 font-semibold">No products found</h4>
                </div>
            )}
        </div>
    );
};

export default ProductDisplay;




