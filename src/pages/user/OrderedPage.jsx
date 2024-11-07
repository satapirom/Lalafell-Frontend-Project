// import React, { useEffect, useState } from 'react';
// import { CheckCircle, Package, Truck } from 'lucide-react';

// const OrderedPage = () => {
//     const [complete, setComplete] = useState(false);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setComplete(true);
//         }, 500); // รอ 0.5 วินาทีก่อนแสดงอนิเมชัน
//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <div className="min-h-screen bg-purple-50 p-6">
//             <div className={`max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-500 ${complete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//                 <div className="p-6">
//                     <div className="flex items-center justify-center mb-6">
//                         <CheckCircle className={`w-16 h-16 text-purple-500 transition-transform duration-500 ${complete ? 'scale-100' : 'scale-150 animate-pulse'}`} />
//                     </div>
//                     <h2 className={`text-2xl font-bold text-center text-gray-800 mb-4 transition-opacity duration-500 ${complete ? 'opacity-100' : 'opacity-0'}`}>Order Confirmed!</h2>
//                     <p className={`text-center text-gray-600 mb-6 transition-opacity duration-500 ${complete ? 'opacity-100' : 'opacity-0'}`}>Thank you for your purchase. Your order is on its way!</p>
//                     <div className="space-y-4">
//                         <div className={`flex items-center p-4 bg-purple-100 rounded-md transition-opacity duration-500 ${complete ? 'opacity-100' : 'opacity-0'}`}>
//                             <Package className="w-8 h-8 text-purple-500 mr-4" />
//                             <div>
//                                 <h3 className="font-semibold text-gray-800">Order #12345</h3>
//                                 <p className="text-sm text-gray-600">Estimated delivery: 3-5 business days</p>
//                             </div>
//                         </div>
//                         <div className={`flex items-center p-4 bg-purple-100 rounded-md transition-opacity duration-500 ${complete ? 'opacity-100' : 'opacity-0'}`}>
//                             <Truck className="w-8 h-8 text-purple-500 mr-4" />
//                             <div>
//                                 <h3 className="font-semibold text-gray-800">Shipping Address</h3>
//                                 <p className="text-sm text-gray-600">123 Kawaii Street, Cute City, 12345</p>
//                             </div>
//                         </div>
//                     </div>
//                     <button className="w-full bg-purple-500 text-white py-3 rounded-md font-semibold mt-6 hover:bg-purple-600 transition-colors duration-200">
//                         Track Order
//                     </button>
//                     <button className="w-full bg-white text-purple-500 border border-purple-500 py-3 rounded-md font-semibold mt-4 hover:bg-purple-100 transition-colors duration-200">
//                         Continue Shopping
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OrderedPage;
