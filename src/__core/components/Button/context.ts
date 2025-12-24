import { createContext, useContext } from 'react';
import { ButtonVariant } from './variants';

export type ButtonContextProps = {
        isLoading: boolean;
        disabled: boolean;
        variant: ButtonVariant
}

export const ButtonContext = createContext<ButtonContextProps | null>(null);
const useButtonContext = () => {
        const context = useContext(ButtonContext);
        if (!context) throw new Error("Button needs to be wrapped in Button.Root");
        return context;
}

export default useButtonContext