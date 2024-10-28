import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../contexts/AuthContext";

const useProfile = () => {
  const { isLoggedIn } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoggedIn) {
        try {
          const response = await axiosInstance.get("/users/profile");
          setProfile(response.data.myUser);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setError(error);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [isLoggedIn]);

  return { profile, error };
};

export default useProfile;
