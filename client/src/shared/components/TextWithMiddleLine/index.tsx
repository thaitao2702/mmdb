import React, { ReactNode } from 'react';

import './styles.scss';

interface ITextWithMiddleLineProps {
    className?: string;
    children: ReactNode;
    customStyle?: Object
}
const TextWithMiddleLine = ({ className = '', children, customStyle = {} }: ITextWithMiddleLineProps) => {
    return (
        <div className={`text-with-middle-line flex-center ${className}`} style={customStyle}>
            {children}
        </div>
    )
}

export default TextWithMiddleLine;