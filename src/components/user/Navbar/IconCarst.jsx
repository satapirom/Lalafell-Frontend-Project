import React from 'react'

const IconCarts = () => {
    return (
        <div className="flex items-center">
            <img
                src='/images/icon-shop-bag.svg'
                alt='Cart'
                className='h-6 w-6 tablet:h-7 tablet:w-7 laptop:h-8 laptop:w-8 cursor-pointer'
            />
        </div>
    )
};

export default IconCarts