import React from 'react'
import Banner from '../../components/user/Banner/Banner'
import WhatNewProduct from '../../components/user/Products/WhatNewProduct'
import OurProduct from '../../components/user/OurProduct/OurProduct'

const Home = () => {
    return (
        <div>
            <Banner />
            <WhatNewProduct />
            <OurProduct />
        </div>
    )
}

export default Home