import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        updateUser(response.data);
      } catch (error) {
        console.error("User authentication failed:", error);
        clearUser();
        navigate("/login");
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, updateUser, clearUser, navigate]);
};