import Banner from '../../components/user/Banner/Banner';
import WhatNewProduct from '../../components/user/Products/WhatNewProduct';
import OurProduct from '../../components/user/OurProduct/OurProduct';
import YouMayAlsoLike from '../../components/user/YouMayAlsoLike/YouMayAlsoLike';

const Home = () => {
    return (
        <div>
            <Banner />
            <WhatNewProduct />
            <OurProduct />
            <YouMayAlsoLike />
        </div>
    )
}

export default Home