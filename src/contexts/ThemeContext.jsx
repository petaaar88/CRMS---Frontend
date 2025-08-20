import {createContext} from 'react';
import useTheme from '../hooks/useTheme';

const ThemeContext = createContext({
    theme: 'light',
    changeTheme: () => {
    },
});

const ThemeProvider = ({children}) => {
    const {theme, changeTheme} = useTheme();

    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
export {ThemeContext}
export default ThemeProvider;
