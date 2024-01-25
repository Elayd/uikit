import { useEffect } from 'react';

export const useOutsideClick = (selector: string, callback: () => void): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const element = document.querySelector(selector);
            if (element && !element.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selector, callback]);
};
