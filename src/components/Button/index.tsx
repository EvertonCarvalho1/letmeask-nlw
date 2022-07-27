import { ButtonHTMLAttributes } from 'react';

import { ButtonClick } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        <ButtonClick className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
    );
}