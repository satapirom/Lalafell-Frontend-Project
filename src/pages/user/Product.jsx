import React from 'react'
import ProductDisplay from '../../components/user/ProductList/ProductDisplay'
import Banner from '../../components/user/Banner/Banner'
import Filter from '../../components/user/ProductList/Filter'


const Product = () => {
    return (
        <div className='container mx-auto  py-4 my-4 max-w-screen-laptopl'>
            <Banner />
            <div className='grid grid-cols-9 gap-4 px-10'>
                <div className='col-span-2'>
                    <Filter />
                </div>
                <div className='col-span-7'>
                    <ProductDisplay />
                </div>

            </div>
        </div>
    )
}

export default Product