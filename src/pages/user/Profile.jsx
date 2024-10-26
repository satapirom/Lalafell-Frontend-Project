import React from 'react'
import ProfileForm from '../../components/user/Profile/ProfileForm'
import MyPurchases from '../../components/user/Profile/MyPurchases'
import PurchaseHistory from '../../components/user/Profile/PurchaseHistory'
import OrderDashboard from '../../components/user/Order/OrderDashboard';
import YouMayAlsoLike from '../../components/user/YouMayAlsoLike/YouMayAlsoLike';

const Profile = () => {
    return (
        <div className='container mx-auto  max-w-screen-laptopl'>
            <ProfileForm />
            <OrderDashboard />
            <PurchaseHistory />
            <YouMayAlsoLike />
        </div>
    )
}

export default Profile

