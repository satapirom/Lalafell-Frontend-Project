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
    const [sortOption, setSortOption] = useState('newest');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const { isOpen: isSizeOpen, toggle: toggleSize, onClose: onCloseSize } = useToggle();
    const { isOpen: isCategoryOpen, toggle: toggleCategory, onClose: onCloseCategory } = useToggle();
    const { isOpen: isFilterOpen, toggle: toggleFilter, onClose: onCloseFilter } = useToggle();
    const [showFilters, setShowFilters] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [showProducts, setShowProducts] = useState(true);

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('search') || '';
    const { state } = location;

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            let response;

            // Check if we have a selected product from search
            if (state?.selectedProduct) {
                console.log('Fetching with selected product:', state.selectedProduct);
                // Fetch products based on selected product's category and search query
                response = await axiosInstance.get(`/products`, {
                    params: {
                        category: state.selectedProduct.category,
                        search: state.searchQuery
                    }
                });
            } else {
                // Normal fetch with all filters
                console.log(`Fetching products with sort: ${sortOption}, size: ${selectedSize}, category: ${selectedCategory}, search: ${searchQuery}`);
                response = await axiosInstance.get(`/products`, {
                    params: {
                        size: selectedSize,
                        category: selectedCategory,
                        search: searchQuery
                    }
                });
            }

            const fetchedProducts = response.data.products;
            console.log('Fetched products:', fetchedProducts);

            if (!Array.isArray(fetchedProducts)) {
                throw new Error('Products is not an array');
            }

            // If we have a selected product, reorganize the array to show it first
            if (state?.selectedProduct) {
                const selectedProductIndex = fetchedProducts.findIndex(
                    p => p._id === state.selectedProduct._id
                );
                if (selectedProductIndex > -1) {
                    const selectedProduct = fetchedProducts.splice(selectedProductIndex, 1)[0];
                    fetchedProducts.unshift(selectedProduct);
                }
            }

            setProducts(fetchedProducts);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [selectedSize, selectedCategory, sortOption, searchQuery, state]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSortChange = (newSortOption) => {
        console.log('Changing sort option to:', newSortOption);
        setSortOption(newSortOption);
        setCurrentPage(1);
    };

    const handleSizeSelect = (size) => {
        console.log('selectedSize:', size);
        setSelectedSize(size);
        setCurrentPage(1);
    };

    const handleCategorySelect = (category) => {
        console.log('selectedCategory:', category);
        setSelectedCategory(category);
        setCurrentPage(1);
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
                    return b.rating - a.rating;
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        };

        return filtered.slice().sort(sortByOption);
    }, [products, selectedSize, selectedCategory, sortOption]);

    // Pagination calculations
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = sortedAndFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedAndFilteredProducts.length / itemsPerPage);

    const handlePageChange = (page) => {
        setShowProducts(false);
        setTimeout(() => {
            setCurrentPage(page);
            setShowProducts(true);
        }, 300);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-color"></div>
        </div>
    );

    if (error) return (
        <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
            Error: {error}
        </div>
    );

    return (
        <div className="container mx-auto mt-10 p-4 tablet:p-8 rounded-lg custom-bg relative">
            <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#5c6bc0" fill="none">
                        <path d="M3 10.5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H12.5M21 10.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M7 17H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M15 18.5H22M18.5 22V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M17.7947 2.00254L6.14885 2.03002C4.41069 1.94542 3.96502 3.2116 3.96502 3.83056C3.96502 4.38414 3.88957 5.19117 2.82426 6.70798C1.75895 8.22478 1.839 8.67537 2.43973 9.72544C2.9383 10.5969 4.20643 10.9374 4.86764 10.9946C6.96785 11.0398 7.98968 9.32381 7.98968 8.1178C9.03154 11.1481 11.9946 11.1481 13.3148 10.8016C14.6376 10.4545 15.7707 9.2118 16.0381 8.1178C16.194 9.47735 16.6672 10.2707 18.0653 10.8158C19.5135 11.3805 20.7589 10.5174 21.3838 9.9642C22.0087 9.41096 22.4097 8.18278 21.2958 6.83288C20.5276 5.90195 20.2074 5.02494 20.1023 4.11599C20.0413 3.58931 19.9878 3.02336 19.5961 2.66323C19.0238 2.13691 18.2026 1.97722 17.7947 2.00254Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h4 className="text-md tablet:text-2xl font-semibold rounded-xl">
                        {state?.selectedProduct ? 'Related Products' : 'All Products'}
                        <span className="rounded-full font-normal bg-primary-color/15 text-gray-800 px-2 py-1 ml-2">
                            {sortedAndFilteredProducts.length}
                        </span>
                    </h4>
                </div>
                <div >
                    {/* แสดงฟิลเตอร์สำหรับแท็บเล็ต */}
                    <div className="hidden tablet:flex space-x-4 items-center mb-4">
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
                            onClose={onCloseFilter}
                        />
                    </div>

                    {/* ปุ่มสำหรับเปิด/ปิดฟิลเตอร์ในขนาดมือถือ */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="text-primary-color tablet:hidden"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5c6dc0" fill="none">
                            <path d="M3 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M3 17H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18 17L21 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 7L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </button>

                    {/* แสดงฟิลเตอร์เมื่อคลิกปุ่มในขนาดมือถือ */}
                    {showFilters && (
                        <div className="flex absolute flex-wrap z-50 top-20 left-6 right-6 bg-white rounded-lg p-4 space-x-4 items-center mb-4 tablet:hidden">
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
                    )}
                </div>
            </div>

            <div className={`transition-opacity duration-300 ${showProducts ? 'opacity-100' : 'opacity-0'}`}>
                {currentProducts.length > 0 ? (
                    <div className="flex flex-wrap products-container">
                        {currentProducts.map((product) => (
                            <div className="w-full p-2 tablet:w-1/4 mobile:w-1/2" key={product._id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <img className="mx-auto w-10 mt-10" src='../images/emoticon.png' alt="No products" />
                        <h4 className="text-lg text-center text-gray-700 mt-4 font-semibold">No products found</h4>
                    </div>
                )}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`btn ${currentPage === index + 1 ? 'bg-primary-color px-4 py-1 rounded-full text-white' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );

};

export default ProductDisplay;









