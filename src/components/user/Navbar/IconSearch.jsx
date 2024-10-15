import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    ${isOpen ? 'w-32 tablet:w-64 opacity-100 ml-3' : 'w-0 opacity-0'}`;

    const iconClasses = `transition-all duration-500 ease-in-out transform
    ${isOpen ? 'rotate-[360deg] scale-110' : ''}`;

    const searchIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"currentColor"} fill={"none"}>
            <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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
            const products = await searchProducts(searchQuery);
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
            navigate(`/products?search=${encodeURIComponent(query.trim())}`);
            resetSearch();
        }
    };

    const resetSearch = () => {
        setIsOpen(false); // ปิดช่องค้นหา
        setQuery(''); // ลบข้อความค้นหา
        setProducts([]); // ลบผลการค้นหา
    };

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            resetSearch(); // ล้างผลการค้นหาเมื่อสูญเสีย focus
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e); // ปิดช่องค้นหาและไปที่หน้าผลลัพธ์
        }
    };

    const toggleSearchBox = () => {
        if (!isOpen) {
            setQuery(''); // ล้างข้อความค้นหาทุกครั้งเมื่อเปิดช่องค้นหาใหม่
        }
        setIsOpen(!isOpen);
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`); // นำทางไปยังหน้าสินค้า
        resetSearch(); // รีเซ็ตค้นหา
    };

    return (
        <div className="relative flex items-center" onBlur={handleBlur}>
            <div className="flex items-center">
                <div
                    className={`${iconClasses} cursor-pointer p-2 rounded-full bg-[#FF6F92] shadow-md hover:shadow-lg hover:bg-[#FF929F] transition-colors duration-300 transform hover:scale-110`}
                    onClick={toggleSearchBox}
                >
                    <div className="text-white">{searchIcon}</div>
                </div>
                <form onSubmit={handleSearch} className={searchBoxClasses}>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="py-2 px-4 w-full text-sm font-light rounded-full outline-none transition-all duration-300 bg-gradient-to-r bg-[#FF6F92]/50 transparent placeholder-white"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={inputRef}
                        aria-label="Product search"
                    />
                </form>
            </div>
            {loading && <p className="mt-2">Loading...</p>}
            {!loading && products.length === 0 && query.length > 2 && (
                <div className="absolute top-full left-0 mt-2 w-full max-w-xs bg-white rounded-lg shadow-lg p-4 z-50">
                    <p className="text-gray-600">No results found.</p>
                </div>
            )}
            {products.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full max-w-xs bg-white rounded-lg shadow-lg p-4 z-50">
                    <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
                    <ul>
                        {products.map((product) => (
                            <li key={product._id} className="mb-2">
                                <h4
                                    className="font-medium cursor-pointer hover:underline"
                                    onClick={() => handleProductClick(product._id)} // นำทางเมื่อคลิกชื่อสินค้า
                                >
                                    {product.name}
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





