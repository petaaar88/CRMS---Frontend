import {useContext, useEffect} from "react"
import {ThemeContext} from "../../contexts/ThemeContext"
import LoginForm from "../../components/LoginForm"
import ThemeButton from "../../components/ThemeButton"

import "../LoginPage/LoginPageStyles.css"
import useBreakpoints from "../../hooks/useBreakpoints"
import {useAuth} from "../../contexts/AuthContext"
import {useNavigate} from "react-router-dom"
import LoadingPage from "../LoadingPage/LoadingPage"

const LoginPage = () => {
    const navigate = useNavigate();
    const {theme} = useContext(ThemeContext);
    const {isMdBreakpoint, isSmBreakpoint} = useBreakpoints();
    const {accessToken, loading} = useAuth();

    useEffect(() => {
        if (!loading && accessToken) {
            navigate("/reports");
        }
    }, [accessToken, loading]);

    if (accessToken || loading)
        return <LoadingPage/>;

    return (

        <div className="flex h-full bg-white dark:bg-dark-green text-black dark:text-white">
            {isMdBreakpoint &&
                <div className={"w-100 " + (theme === "dark" ? " dark-theme-gradient " : " light-theme-gradient ")}>
                </div>
            }
            <div className="relative w-full flex  justify-center">
                {!isSmBreakpoint && <div className="absolute mt-8">
                    <ThemeButton/>
                </div>}
                <div className="h-auto flex flex-col justify-center">
                    <h1 className="md:text-7xl text-5xl sm:text-left text-center font-bold mb-3">CRMS</h1>
                    <h2 className="md:text-3xl text-2xl sm:text-left text-center mb-8">Welcome Back.</h2>
                    <LoginForm/>

                </div>
                {isSmBreakpoint && <div className="absolute bottom-0 right-0  me-8 mb-5">
                    <ThemeButton/>
                </div>}

            </div>
        </div>

    )
}

export default LoginPage