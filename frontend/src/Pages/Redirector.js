import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Redirector = () => {
    var redirected_route;
    // localStorage.setItem("isLoggedIn", 0);
    if(localStorage.getItem("isLoggedIn") == undefined)
        localStorage.setItem("isLoggedIn", 0);
    if(localStorage.getItem("isLoggedIn") == 0) {
        redirected_route = "/auth";
    }
    else {
        redirected_route = "/profile";
    }
    const navigate = useNavigate();
    useEffect(() => {
        navigate(redirected_route)
    }, [])
    // return(<Outlet />);
};

export default Redirector;
