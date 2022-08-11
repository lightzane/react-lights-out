import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => {
    return <>
        <div className={`grid ${className}`}>
            <div className='col-12 md:col-8'>
                {children}
            </div>
        </div>
    </>;
};