import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Layout: React.FC<Props> = ({ children, className }) => {
    return <>
        <div className={`grid justify-content-center h-screen ${className}`}>
            <div className='col-12 md:col-8'>
                {children}
            </div>
        </div>
    </>;
};