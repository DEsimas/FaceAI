import { MouseEventHandler } from 'react';

export type ButtonProps = {
    text?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isLoading?: boolean;
    type?: 'default' | 'back' | 'close' | 'accent';
    z_index?: number;
}