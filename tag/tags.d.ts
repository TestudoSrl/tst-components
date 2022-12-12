import { type FC } from 'react';
interface TagProps {
    data: string[];
    showAll?: boolean;
    tagsToShow?: number;
    size?: 'small' | 'medium';
    variant?: 'outlined' | 'filled';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
    noTagMessage?: string;
    margin?: number;
}
export declare const Tag: FC<TagProps>;
export {};
