import { createContext, ReactNode, useEffect, useState } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components';
import light from '../styles/themes/light';
import dark from '../styles/themes/light';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
    children: ReactNode;
}

type ThemeContextType = {
    theme: DefaultTheme;
    setCurrentTheme(theme: DefaultTheme): void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(light);

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(currentTheme));
    }, [currentTheme])

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, setCurrentTheme }}>
            <ThemeProvider theme={currentTheme}>
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}