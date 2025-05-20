import { useEffect, useState } from 'react'
import useWindowResize from './useWindowResize';

const useBreakpoints = () => {

    const{windowSize}= useWindowResize();
    const [isMdBreakpoint,setIsMdBreakpoint] = useState(null);
    const [isLgBreakpoint,setIsLgBreakpoint] = useState(null);

    useEffect(()=>{

        if(windowSize.width >=992){
            setIsLgBreakpoint(true)
            setIsMdBreakpoint(true);
        }else{
            setIsLgBreakpoint(false)
            if(windowSize.width >= 768)
                setIsMdBreakpoint(true);
            else
                setIsMdBreakpoint(false);
        }

    },[windowSize.width]);




  return {isMdBreakpoint, isLgBreakpoint}
}

export default useBreakpoints