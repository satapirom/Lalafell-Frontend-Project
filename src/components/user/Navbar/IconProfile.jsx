import useAuth from '../../../hooks/useAuth';
import DropdownMenu from './DropdownMenu';

const IconProfile = () => {
    const { isDropdownOpen, toggleDropdown, handleLogout } = useAuth();

    return (
        <div className="relative flex items-center">
            <div>
                <img
                    src='/images/icon-profile.svg'
                    alt='Profile'
                    className='h-6 w-6 tablet:h-7 tablet:w-7 laptop:h-8 laptop:w-8 cursor-pointer'
                    onClick={toggleDropdown}
                />
                <DropdownMenu isOpen={isDropdownOpen} onLogout={handleLogout} />
            </div>
        </div>
    );
};

export default IconProfile;