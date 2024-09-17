import React, { useState } from 'react';

const ProductDisplay = () => {
    // ข้อมูลสินค้าจริง
    const products = Array.from({ length: 23 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        description: `This is the description for product ${i + 1}.`
    }));

    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    // คำนวณจำนวนหน้าจากจำนวนสินค้า
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // กำหนดขอบเขตของสินค้าที่จะแสดงในแต่ละหน้า
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    return (
        <div className="p-6">
            {/* ส่วนหัวของหน้า */}
            <div className='flex justify-between items-center mb-6'>
                <h4 className="text-2xl font-semibold">Products ({products.length})</h4>
                <div>
                    <label className="mr-2">Sort by:</label>
                    <select className="border rounded-md p-1">
                        <option value="price">Price</option>
                        <option value="popularity">Popularity</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>
            </div>

            {/* กริดแสดงสินค้า */}
            <div className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4'>
                {currentProducts.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md">
                        <h1 className="font-bold text-lg">{product.name}</h1>
                        <p>{product.description}</p>
                        <button
                            className="bg-blue-500 text-white py-1 px-2 rounded mt-4"
                            onClick={() => alert(`You clicked on ${product.name}`)}
                        >
                            View Product
                        </button>
                    </div>
                ))}
            </div>

            {/* แสดงเลขหน้าถ้ามีมากกว่า 10 สินค้า */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center space-x-2">
                    {/* ปุ่มเปลี่ยนหน้า */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`py-1 px-3 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductDisplay;

