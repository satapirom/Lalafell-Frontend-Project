import React, { useState } from 'react';
import AddressManagement from '../../components/user/Setting/AddressManagement';
import { FaUserCircle, FaMapMarkerAlt, FaCreditCard, FaQuestionCircle, FaUsers, FaFileAlt, FaBell, FaLanguage, FaShieldAlt } from 'react-icons/fa';
import SettingsItem from '../../components/user/Setting/SettingsItem';
import { Cog } from 'lucide-react';

const Settings = () => {
    const [activeSection, setActiveSection] = useState(null); // null means no section is active initially

    const settingsItems = [
        { id: 'account', icon: <FaUserCircle />, title: 'Account & Security', description: 'Manage your personal information and security settings' },
        { id: 'address', icon: <FaMapMarkerAlt />, title: 'My Addresses', description: 'Manage your shipping and billing addresses' },
        { id: 'payment', icon: <FaCreditCard />, title: 'Bank Accounts/Cards', description: 'Manage your payment methods' },
        { id: 'help', icon: <FaQuestionCircle />, title: 'Help Centre', description: 'Get support and answers to your questions' },
        { id: 'community', icon: <FaUsers />, title: 'Community', description: 'Join discussions and connect with other users' },
        { id: 'policies', icon: <FaFileAlt />, title: 'Policies', description: 'Review our terms of service and policies' },
        { id: 'notifications', icon: <FaBell />, title: 'Notifications', description: 'Manage your notification preferences' },
        { id: 'language', icon: <FaLanguage />, title: 'Language & Region', description: 'Set your preferred language and region' },
        { id: 'privacy', icon: <FaShieldAlt />, title: 'Privacy', description: 'Control your privacy settings' },
    ];

    return (
        <div className="container mx-auto px-4 mt-16 py-8 max-w-screen-xl rounded-lg">
            <div className='flex space-x-2 '>
                <Cog size={32} color='#1f2937' />
                <h1 className="text-2xl font-bold mb-8 text-gray-800">Settings</h1>
            </div>
            <div className="space-y-4">
                {settingsItems.map((item) => (
                    <div key={item.id}>
                        <SettingsItem
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            isActive={activeSection === item.id}
                            onClick={() => setActiveSection(activeSection === item.id ? null : item.id)}
                        />

                        {/* Render the content under each SettingsItem */}
                        {activeSection === item.id && (
                            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                                {item.id === 'address' && <AddressManagement />}
                                {item.id !== 'address' && (
                                    <p className="text-gray-600">
                                        This is where you can manage your {item.title} settings. Content for this section is not implemented in this example.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Settings;

