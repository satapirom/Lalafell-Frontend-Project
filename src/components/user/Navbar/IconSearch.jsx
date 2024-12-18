import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { searchProducts } from '../../../services/productServices';

const ProductSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();


    const searchBoxClasses = `transition-all duration-500 ease-in-out overflow-hidden
    ${isOpen ? 'min-w-[200px] tablet:min-w-[300px] opacity-100 ml-3' : 'w-0 opacity-0'}`;

    const iconClasses = `transition-all duration-500 ease-in-out transform
    ${isOpen ? 'rotate-[360deg] scale-110' : ''}`;

    const searchIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
            <path d="M17.5 17.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        </svg>
    );

    const starIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" currentColor="#ffffff" fill="none">
            <path d="M15 15L16.5 16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16.9391 19.0593C16.3536 18.4739 16.3536 17.5246 16.9391 16.9391C17.5246 16.3536 18.4739 16.3536 19.0593 16.9391L21.0609 18.9407C21.6464 19.5261 21.6464 20.4754 21.0609 21.0609C20.4754 21.6464 19.5261 21.6464 18.9407 21.0609L16.9391 19.0593Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M5.39321 3.57735L8.18155 4.51716C8.56707 4.65061 9.15209 4.56335 9.48335 4.32736L11.4394 2.93236C12.6909 2.04083 13.7267 2.57255 13.7278 4.11802L13.7385 6.73427C13.7403 7.17734 14.0485 7.72717 14.4239 7.96607L16.4225 9.2191C18.0034 10.212 17.8236 11.3875 16.0219 11.8442L13.5143 12.4774C13.0612 12.5916 12.5938 13.0591 12.4744 13.5175L11.8413 16.0256C11.3899 17.8224 10.2041 18.0021 9.21671 16.4262L7.96391 14.4272C7.72505 14.0518 7.17533 13.7436 6.73234 13.7418L4.11658 13.731C2.57665 13.7246 2.03977 12.6939 2.93114 11.4422L4.32588 9.48579C4.55657 9.15972 4.64382 8.57459 4.51039 8.189L3.57076 5.40014C3.06353 3.88424 3.88284 3.06477 5.39321 3.57735Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.length > 2) {
                searchForProducts(query);
            } else {
                setProducts([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const searchForProducts = async (searchQuery) => {
        setLoading(true);
        setError(null);
        try {
            console.log('Searching for products with query:', searchQuery); // Log the search query
            const products = await searchProducts(searchQuery);
            console.log('Products fetched:', products); // Log the fetched products
            setProducts(products.length > 0 ? products : []);
            if (products.length === 0) {
                setError('No products found matching your search.');
            }
        } catch (err) {
            setError('Error searching products. Please try again.');
            console.error('Error searching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?search=${encodeURIComponent(query.trim())}`);
            resetSearch();
        }
    };

    const handleProductClick = async (product) => {
        try {
            // เรียกข้อมูลสินค้าจาก API
            const productData = await searchProducts(product._id);

            // ส่งข้อมูลสินค้าผ่าน state navigation
            navigate(`/product/${product._id}`, {
                state: {
                    searchQuery: query.trim(),
                    selectedProduct: productData // ใช้ข้อมูลสินค้าที่ดึงมาจาก API
                }
            });

            resetSearch();
        } catch (error) {
            console.error('Error fetching product data:', error);
            // สามารถแสดงข้อความแจ้งเตือนหรือให้ผู้ใช้ทราบได้ที่นี่
        }
    };


    const resetSearch = () => {
        setIsOpen(false);
        setQuery('');
        setProducts([]);
    };

    // เพิ่ม setTimeout เพื่อให้มีเวลาพอที่จะเกิด click event ก่อนที่จะปิดผลการค้นหา
    const handleBlur = (e) => {
        setTimeout(() => {
            // เช็คว่า relatedTarget ไม่เป็น null
            if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
                resetSearch();
            }
        }, 200);
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    const toggleSearchBox = () => {
        if (!isOpen) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 300);
        }
        setIsOpen(!isOpen);
    };

    const getRandomPlaceholder = () => {
        const placeholders = [
            "Search for magical keyboards...",
            "Find your perfect Lalafell-sized key...",
            "Discover tiny treasures...",
            "Seek the legendary Golden Potato Key...",
            "Uncover hidden keyboard gems..."
        ];
        return placeholders[Math.floor(Math.random() * placeholders.length)];
    };

    return (
        <div className="relative flex items-center" onBlur={handleBlur}>
            <div className="flex items-center">
                <div
                    className={`${iconClasses} cursor-pointer p-2 rounded-full bg-primary-color shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110`}
                    onClick={toggleSearchBox}
                >
                    <div className="text-white">{isOpen ? starIcon : searchIcon}</div>
                </div>
                <form onSubmit={handleSearch} className={searchBoxClasses}>
                    <input
                        type="text"
                        placeholder={getRandomPlaceholder()}
                        className="py-2 px-4 m-1 w-42 tablet:min-w-96 text-sm font-light rounded-full outline-none transition-all duration-300 bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary-color focus:ring-opacity-50"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={inputRef}
                        aria-label="Product search"
                    />
                </form>
            </div>
            {loading && <p className="mt-2 text-sm text-primary-color">Summoning products...</p>}
            {!loading && products.length === 0 && query.length > 2 && (
                <div className="absolute top-full left-0 mt-2 w-full max-w-xs bg-white rounded-lg shadow-lg p-4 z-50">
                    <p className="text-gray-800 text-sm">No magical items found. Try another spell!</p>
                </div>
            )}
            {products.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full max-w-xs bg-white rounded-lg shadow-lg p-4 z-50">
                    <h3 className="text-lg font-normal mb-2 text-gray-800">Magical Findings:</h3>
                    <ul>
                        {products.map((product) => (
                            <li key={product._id} className="mb-2">
                                <h4
                                    className="font-normal cursor-pointer text-gray-800 hover:underline transition-colors duration-300"
                                    onClick={() => handleProductClick(product)}
                                >
                                    <div className='flex'>
                                        <span className="mr-2" style={{ color: "#5c6bc0" }}>
                                            {starIcon}
                                        </span>
                                        {product.name}
                                    </div>

                                </h4>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductSearch;