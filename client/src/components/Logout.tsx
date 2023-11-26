import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const Logout = ({ setIsLoggedIn } : {setIsLoggedIn: (isLoggedIn: boolean) => void}) => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        navigate("/login");
    }, [navigate])

    return (
        <>
        </>
    )
}