import React from 'react'
import ProfileForm from '../../components/user/Profile/ProfileForm'
import MyPurchases from '../../components/user/Profile/MyPurchases'
import PurchaseHistory from '../../components/user/Profile/PurchaseHistory'
import MyPayment from '../../components/user/Profile/MyPayment'

const Profile = () => {
    return (
        <div className='container mx-auto px-4 mt-24 py-4  max-w-screen-laptopl'>
            <ProfileForm />
            <MyPurchases />
            <PurchaseHistory />
            <MyPayment />
        </div>
    )
}

export default Profile

