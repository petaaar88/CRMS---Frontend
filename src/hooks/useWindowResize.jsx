import {useEffect, useState} from "react"

const useWindowResize = () => {

    const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});

    useEffect(() => {

        const handleResize = () => {
            const width = document.documentElement.clientWidth || window.innerWidth;
            const height = document.documentElement.clientHeight || window.innerHeight;

            setWindowSize({width, height});
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return {windowSize}
}

export default useWindowResize