import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../../components/user/Cart/CartItem';
import useCart from '../../hooks/user/useCart';
import { useEffect } from 'react';
import { cartEventEmitter } from '../../hooks/user/useCartCount';
import YouMayAlsoLike from '../../components/user/YouMayAlsoLike/YouMayAlsoLike';
import toast from 'react-hot-toast';
const CartPage = () => {
    const {
        cart,
        isLoading,
        error,
        selectedItems,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveItem,
        handleSelectItem,
        handleSelectAll,
        handleRemoveSelectedItems,
        calculateTotal,
        refreshCart
    } = useCart();

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = cartEventEmitter.subscribe(refreshCart);
        return () => unsubscribe();
    }, [refreshCart]);

    const handleProceedToCheckout = () => {
        if (selectedItems.size === 0) {
            toast.error('Please select at least one item to proceed.');
            return;
        }
        const selectedCartItems = Array.from(selectedItems).map(itemId =>
            cart.items.find(item => item.product._id === itemId)
        );
        navigate('/checkout', { state: { selectedCartItems } });
    };

    const handleQuantityUpdate = async (productId, change) => {
        await handleUpdateQuantity(productId, change);
        cartEventEmitter.emit();
    };

    const handleItemRemoval = async (productId) => {
        await handleRemoveItem(productId);
        cartEventEmitter.emit();
    };

    const handleSelectedItemsRemoval = async () => {
        await handleRemoveSelectedItems();
        cartEventEmitter.emit();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600 border-b-4 border-transparent"></div>
            </div>
        );
    }

<<<<<<< HEAD
    return (
        <div className="container mx-auto mt-20 px-4 tablet:px-8">
            <div className='custom-bg rounded-lg p-4 tablet:p-8'>
                <div className='flex items-center gap-2 mb-4 tablet:mb-6'>
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-8 h-8 tablet:w-12 tablet:h-12 laptop:w-16 laptop:h-16 text-black"
                            fill="none"
                        >
                            <path d="M11.5 8H20.196C20.8208 8 21.1332 8 21.3619 8.10084C22.3736 8.5469 21.9213 9.67075 21.7511 10.4784C21.7187 10.6318 21.6188 10.7251 21.5 10.8013M7.5 8H3.80397C3.17922 8 2.86684 8 2.63812 8.10084C1.6264 8.5469 2.07874 9.67075 2.24894 10.4784C2.27952 10.6235 2.37896 10.747 2.51841 10.8132C3.09673 11.0876 3.50177 11.6081 3.60807 12.2134L4.20066 15.5878C4.46138 17.0725 4.55052 19.1942 5.8516 20.2402C6.8062 21 8.18162 21 10.9325 21H12"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M14.1418 13.4418C15.3486 12.7108 16.4018 13.0054 17.0345 13.4747C17.294 13.6671 17.4237 13.7633 17.5 13.7633C17.5763 13.7633 17.706 13.6671 17.9655 13.4747C18.5982 13.0054 19.6514 12.7108 20.8582 13.4418C22.4419 14.4013 22.8002 17.5666 19.1472 20.237C18.4514 20.7457 18.1035 21 17.5 21C16.8965 21 16.5486 20.7457 15.8528 20.237C12.1998 17.5666 12.5581 14.4013 14.1418 13.4418Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M6.5 11L10 3M15 3L17.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </span>
                    <h2 className='text-2xl tablet:text-3xl font-semibold text-gray-800'>Shopping Cart</h2>
=======
     return (
        <div className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8">
            <div className='custom-bg rounded-lg p-4 tablet:p-8'>
                <div className='flex items-center gap-2 mb-4 tablet:mb-6 w-full'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  color="#000000" fill="none" className='w-8 h-8 tablet:w-10 tablet:h-10'>
                            <path d="M11.5 8H20.196C20.8208 8 21.1332 8 21.3619 8.10084C22.3736 8.5469 21.9213 9.67075 21.7511 10.4784C21.7187 10.6318 21.6188 10.7251 21.5 10.8013M7.5 8H3.80397C3.17922 8 2.86684 8 2.63812 8.10084C1.6264 8.5469 2.07874 9.67075 2.24894 10.4784C2.27952 10.6235 2.37896 10.747 2.51841 10.8132C3.09673 11.0876 3.50177 11.6081 3.60807 12.2134L4.20066 15.5878C4.46138 17.0725 4.55052 19.1942 5.8516 20.2402C6.8062 21 8.18162 21 10.9325 21H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M14.1418 13.4418C15.3486 12.7108 16.4018 13.0054 17.0345 13.4747C17.294 13.6671 17.4237 13.7633 17.5 13.7633C17.5763 13.7633 17.706 13.6671 17.9655 13.4747C18.5982 13.0054 19.6514 12.7108 20.8582 13.4418C22.4419 14.4013 22.8002 17.5666 19.1472 20.237C18.4514 20.7457 18.1035 21 17.5 21C16.8965 21 16.5486 20.7457 15.8528 20.237C12.1998 17.5666 12.5581 14.4013 14.1418 13.4418Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M6.5 11L10 3M15 3L17.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </span>
                    <h2 className='text-2xl tablet:text-3xl  font-semibold text-gray-800'>Shopping Cart</h2>
>>>>>>> 1b26c91523b6efc228ca6b865d019f7f9d4f057f
                </div>

                {cart.items.length === 0 ? (
                    <div className="text-center text-gray-500">
                        <p>Your cart is empty!</p>
                        <Link to="/products" className="text-blue-600 hover:underline">Go to Shopping</Link>
                    </div>
                ) : (
                    <>
<<<<<<< HEAD
                        <div className='p-4 tablet:p-8 rounded-lg custom-galssmorpuism'>
                            <div className="flex items-center mb-4">
=======
                        <div className='p-4 tablet:p-8 rounded-lg custom-glassmorphism'>
                            <div className="flex items-center mb-2 tablet:mb-4">
>>>>>>> 1b26c91523b6efc228ca6b865d019f7f9d4f057f
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedItems.size === cart.items.length}
<<<<<<< HEAD
                                    className="mr-2 w-4 h-4 tablet:w-6 tablet:h-6 rounded-xl border-gray-100"
=======
                                    className="mr-2 w-4 tablet:w-6 h-4 tablet:h-6 rounded-xl border-gray-100"
>>>>>>> 1b26c91523b6efc228ca6b865d019f7f9d4f057f
                                />
                                <span className='tablet:text-lg font-normal'>Select All</span>
                            </div>
                            {cart.items.map(item => (
                                <CartItem
                                    key={item.product._id}
                                    item={item}
                                    onUpdateQuantity={handleQuantityUpdate}
                                    onRemoveItem={handleItemRemoval}
                                    selectedItems={selectedItems}
                                    onSelectItem={handleSelectItem}
                                />
                            ))}
<<<<<<< HEAD
                            <div className="flex flex-col tablet:flex-row justify-between items-center mt-6">
=======
                            <div className="flex justify-between items-center text-sm tablet:text-lg font-normal  px-4 py-2 rounded-md">
                                    <span>
                                        Total:
                                        </span>
                                        <span>
                                        ฿ {calculateTotal().toFixed(2)}
                                            </span>
                                </div>
                            <div className="flex flex-row justify-between items-center mt-4 tablet:mt-6 tablet:space-y-0">
>>>>>>> 1b26c91523b6efc228ca6b865d019f7f9d4f057f
                                <button>
                                    <Link
                                        to="/products"
                                        className="text-sm tablet:text-lg border border-primary-color text-gray-800 hover:text-white px-4 py-2 rounded-lg hover:bg-primary-color/80 transition duration-200"
                                    >
                                        Back
                                    </Link>
                                </button>
<<<<<<< HEAD
                                <div className="text-lg font-normal bg-primary-color/15 px-4 py-2 rounded-md mt-4 tablet:mt-0">
                                    Total: ฿{calculateTotal().toFixed(2)}
                                </div>
                                <div className="flex items-center mt-4 tablet:mt-0">
                                    <div className="relative group">
                                        <button
                                            onClick={handleSelectedItemsRemoval}
                                            className="bg-primary-color/15 py-2 px-2 mr-2 rounded-md hover:bg-primary-color/40 transition duration-200"
                                        >
                                            <svg
=======
                                <div className="flex items-center space-x-2 ">
                                <button
                                        onClick={handleSelectedItemsRemoval}
                                        className="bg-primary-color/15 py-2  px-2 rounded-md hover:bg-primary-color/40 transition duration-200 mr-0 tablet:mr-2"
                                    >
                                        <svg
>>>>>>> 1b26c91523b6efc228ca6b865d019f7f9d4f057f
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                color="#5c6bc0"
                                                fill="none"
                                                className='w-5 h-5 tablet:w-6 tablet:h-6'
                                            >
                                                <path d="M19.5 5.5L19.0982 12.0062M4.5 5.5L5.10461 15.5248C5.25945 18.0922 5.33688 19.3759 5.97868 20.299C6.296 20.7554 6.7048 21.1407 7.17905 21.4302C7.85035 21.84 8.68108 21.9631 10 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M20 15L13 21.9995M20 22L13 15.0005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                    </button>
                                    <button
                                        onClick={handleProceedToCheckout}
                                        className="bg-primary-color text-sm tablet:text-lg text-white px-4 tablet:px-8 py-2 rounded-md hover:bg-primary-color/80 transition duration-200"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <YouMayAlsoLike />
        </div>
    );
};

export default CartPage;
