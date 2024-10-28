const SettingsItem = ({ icon, title, description, isActive, onClick }) => (
    <div
        className={`flex items-center p-4 m-2 tablet:m-0 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-blue-100 border-l-4 border-primary-color' : 'hover:bg-primary-color/15'}
            }`}
        onClick={onClick}
    >
        <div className={`text-2xl mr-4 ${isActive ? 'text-primary-color' : 'text-gray-500'}`}>{icon}</div>
        <div>
            <h3 className={`font-semibold ${isActive ? 'text-primary-color' : 'text-gray-700'}`}>{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    </div>
);

export default SettingsItem;
