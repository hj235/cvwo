import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./useUserContext"

export const useLoggedInRedirect = () => {
    const { userState } = useUserContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (userState.isLoggedIn) navigate("/")
    }, [userState])
}