import React, { useState } from 'react';
import MyPurchases from '../Profile/MyPurchases';
import Orderlist from '../Order/Orderlist';

const OrderDashboard = () => {
    const [selectedStatus, setSelectedStatus] = useState(null);

    const handleStatusClick = (status) => {
        if (selectedStatus === status) {
            // If the clicked status is already selected, clear it
            setSelectedStatus(null);
        } else {
            // Otherwise, set the new status
            setSelectedStatus(status);
        }
    };

    return (
        <div>
            <MyPurchases setSelectedStatus={handleStatusClick} />
            {selectedStatus && <Orderlist selectedStatus={selectedStatus} />}
        </div>
    );
};

export default OrderDashboard;
