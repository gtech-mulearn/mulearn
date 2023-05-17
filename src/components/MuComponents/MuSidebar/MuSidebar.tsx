import React, { ReactNode } from 'react';
import MulearnBrand from '../../../modules/Portal/Dashboard/assets/MulearnBrand';

interface SidebarProps {
    children: ReactNode;
    showMulearnBrand?: boolean;
}

const MuSidebar = ({ showMulearnBrand, children }: SidebarProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgb(235, 235, 245)',
                height: '100%',
                width: '250px',
                padding: '10px',
            }}
        >
            {((showMulearnBrand ?? true) &&
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100px',
                        width: '100%',
                        marginBottom: '20px',
                    }}
                >
                    <MulearnBrand />
                </div>)}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default MuSidebar;
