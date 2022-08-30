import React, { ReactNode } from 'react';
import './styles.scss';

import Spinner from 'shared/components/Spinner'

interface menuBtnProps {
    [key: string]: any;
    children: ReactNode;
    className?: string;
    onClick?: (...args: any[]) => any;
    disabled?: boolean;
    enableSpinner?: boolean;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

const AuthBtn = ({ children, className = '', onClick, disabled = false, type, enableSpinner = false }: menuBtnProps) => {
    return (
        <button className={`auth-btn flex-center ${className}`} onClick={onClick} disabled={disabled} type={type}>
            {enableSpinner && disabled && <Spinner className="mr-3" size={20}></Spinner>}
            {children}
        </button>
    );
};

export default AuthBtn;
