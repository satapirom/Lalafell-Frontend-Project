import React from 'react'
import ProductDisplay from '../../components/user/ProductList/ProductDisplay'
import Banner from '../../components/user/Banner/Banner'
import Filter from '../../components/user/ProductList/Filter'


const Product = () => {
    return (
        <div className='container mx-auto  py-4 my-4 max-w-screen-laptopl'>
            <ProductDisplay />
        </div>
    )
}

export default Product