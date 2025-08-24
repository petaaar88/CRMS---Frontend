import { useEffect, useState } from 'react'
import useWindowResize from './useWindowResize';

const useBreakpoints = () => {

    const{windowSize}= useWindowResize();
    const [isMdBreakpoint,setIsMdBreakpoint] = useState(null);
    const [isLgBreakpoint,setIsLgBreakpoint] = useState(null);
    const [isSmBreakpoint,setIsSmBreakpoint] = useState(null);

    useEffect(() => {
        if (windowSize.width >= 1024) {
            setIsLgBreakpoint(true);
            setIsMdBreakpoint(true);
            setIsSmBreakpoint(true);
        } else {
            setIsLgBreakpoint(false);

            if (windowSize.width >= 768) {
                setIsMdBreakpoint(true);
                setIsSmBreakpoint(true);
            } else {
                setIsMdBreakpoint(false);

                if (windowSize.width >= 640) {
                    setIsSmBreakpoint(true);
                } else {
                    setIsSmBreakpoint(false);
                }
            }
        }
    }, [windowSize.width]);




  return {isMdBreakpoint, isLgBreakpoint, isSmBreakpoint}
}

export default useBreakpoints