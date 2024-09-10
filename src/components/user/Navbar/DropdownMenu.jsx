const DropdownMenu = ({ isOpen, onLogout }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-8 right-0 mt-2 p-2 w-48 bg-white rounded-md shadow-lg">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-[#E9E4D6]/50 rounded-md">
                View Profile
            </a>
            <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#E9E4D6]/50 rounded-md"
            >
                Logout
            </button>
        </div>
    );
};

export default DropdownMenu;