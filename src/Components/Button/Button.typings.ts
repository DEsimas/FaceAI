import { MouseEventHandler } from 'react';

export type ButtonProps = {
    text: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}