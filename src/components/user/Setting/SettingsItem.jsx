const SettingsItem = ({ icon, title, description, isActive, onClick }) => (
    <div
        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-100'
            }`}
        onClick={onClick}
    >
        <div className={`text-2xl mr-4 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>{icon}</div>
        <div>
            <h3 className={`font-semibold ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    </div>
);

export default SettingsItem;
