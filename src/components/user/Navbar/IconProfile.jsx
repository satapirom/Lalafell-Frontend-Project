
import React, { useRef } from "react";
import DropdownMenu from "./DropdownMenu";
import useToggleDropdown from "../../../hooks/user/useToggleDropdown";
import useProfile from "../../../hooks/user/useProfile";
import ProfileImage from "../../../components/user/Profile/ProfileImage"
import { useAuth } from "../../../contexts/AuthContext";

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
        <ProfileImage
          imageUrl={profile?.profileImage && profile.profileImage[0]?.url}
          username={profile?.username}
        />
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
