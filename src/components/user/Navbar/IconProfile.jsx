import React, { useRef } from "react";
import DropdownMenu from "./DropdownMenu";
import useToggleDropdown from "../../../hooks/user/useToggleDropdown";
import useProfile from "../../../hooks/user/useProfile";
import ProfileImage from "../../../components/user/Profile/ProfileImage";
import { useAuth } from "../../../contexts/AuthContext";
import { FaUserAlt } from "react-icons/fa";

const IconProfile = () => {
  const profileRef = useRef(null);
  const { isOpen, toggleDropdown, closeDropdown } = useToggleDropdown(profileRef);
  const { profile } = useProfile();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    closeDropdown();
  };

  return (
    <div className="relative flex items-center" ref={profileRef}>
      <div
        className="cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={toggleDropdown}
      >
        {/* Conditionally render ProfileImage or default SVG icon */}
        {profile?.profileImage?.[0]?.url ? (
          <ProfileImage
            imageUrl={profile.profileImage[0]?.url}
            username={profile?.username}
          />
        ) : (
          <span className="bg-primary-color p-2 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="white" fill="none">
              <path
                d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
              <path
                d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                stroke="currentColor" strokeWidth="1.5"
              />
            </svg>
          </span>
        )}
      </div>
      <DropdownMenu
        isOpen={isOpen}
        onClose={closeDropdown}
        profile={profile}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default IconProfile;
